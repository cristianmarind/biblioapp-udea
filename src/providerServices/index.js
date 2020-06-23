import axios from 'axios'
let codes = require('./responseCodes.js')
let appKey = "UGT*Vh4e11@s";


export default class ProviderService {

  constructor(rootAPI) {
    this.rootAPI = rootAPI
    let token = localStorage.getItem('token');
    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = token;
      return config;
    });
  }

  /*
      Parámetros:
          route: ruta del servicio DELETE
      Función:
          Envía una petición REST tipo DELETE a la ruta 'route' especificada
          - Es un método genérico para cualquier petición realizada a un servicio DELETE de loopback
      Ejemplos de uso:
          Loopback route: /products/{id}
          route: `products/${[id de un producto]}`  //NO SE PONE EL '/' inicial
          providerServices: [this.$]store.getters.providerServices
          código:
              providerServices.deleteModel(route).then(response => { ... }).catch(error => { .. })
  */
  deleteModel(route) {
    return axios.delete(`${this.rootAPI}/${route}`, { /*headers: { "Authorization": this.accessToken },*/ withCredentials: true })
  }

  /*
      Parámetros:
          route: ruta del servicio POST
          data: parámetros requeridos por el servicio
      Función:
          Envía una petición REST tipo POST a la ruta 'route' especificada y con los parámetros establecidos
          - Es un método genérico para cualquier petición realizada a un servicio POST de loopback
      Ejemplos de uso:
          Loopback route: /products
          route: `products`  //NO SE PONE EL '/' inicial
          providerServices: [this.$]store.getters.providerServices
          código:
              providerServices.postModel(route, {
                  "name": "string",
                  "description": "string",
                  "price": 0,
                  "address": "string",
                  "cityId": 0,
                  "userId": 0
              }).then(response => { ... }).catch(error => { .. })
  */
  postModel(route, data) {
    return axios.post(`${this.rootAPI}${route}`, data, { /*headers: { "Authorization": this.accessToken }, withCredentials: true */ })
  }

  postModelFormData(route, bodyFormData) {
    return axios({
      method: 'post',
      url: `${this.rootAPI}${route}`,
      data: bodyFormData,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
  }

  /* Es la misma explicacion que el metodo postModel y deleteModel */
  patchModel(route, data) {
    return axios.patch(`${this.rootAPI}${route}`, data, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
  }

  /* Es la misma explicacion que el metodo postModel y deleteModel */
  putModel(route, data) {
    return axios.patch(`${this.rootAPI}${route}`, data, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
  }

  /* Es la misma explicacion que el metodo postModel y deleteModel */
  getModel(route, query) {
    let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
    return axios.get(`${this.rootAPI}${route}${filter}`, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
  }

  searchMaterial(query, pagina, regxpagina) {
    var bodydata = [{ appKey: appKey, busqueda: query, pagina: pagina, regxpagina: regxpagina }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_OLIB/APP_ConsultarCatalogo.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {
          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))
        } else {
          reject({
            msg: codes.CODES.SEARCH_EMPTY.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  consultarDetallesTitulo(titleno) {


    var bodydata = [{ appKey: appKey, titleno: titleno }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_OLIB/APP_ConsultarDetallesTitulo.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {


          resolve(JSON.parse(response.data[0].respuesta.split("\n").join(""))[0])

        } else {
          reject({
            msg: codes.CODES.SEARCH_EMPTY.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  addMaterialToFavorites(titleno) {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId'), titleno: titleno }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_AgregarAListaDeDeseos.php', bodydata).then(response => {
        if (response.data.resultadoGuardarBusqueda === true) {
          resolve({
            msg: response.data.mensajeServicio
          })
        } else {
          reject({
            msg: codes.CODES.ERROR_ADDWISHLIST.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  deleteWishListItem(titleno) {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId'), titleno: titleno }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_olib/APP_EliminarDeListadeDeseos.php', bodydata).then(response => {
        if (response.data.resultadoEliminarBusqueda == true) {

          resolve(response.data.mensajeServicio)

        } else {
          reject({
            msg: codes.CODES.ERROR_DELETEWISHLIST.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  getWishList() {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_olib/APP_ListarDeseosPorUsuario.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {
          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))
        } else {
          reject({
            msg: codes.CODES.EMPTY_WISHLIST
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }
  getMyReservations() {
    var bodydata = [{ appKey: appKey, cedula: localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_ConsultarReservasActivas.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {
          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))
        } else {
          reject({
            msg: codes.CODES.EMPTY_RESERVATION
          })
        }
      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }
  getLoanHistory() {
    var pagina = 1;
    var regxpagina = 10;
    var bodydata = [{ appKey: appKey, cedula: localStorage.getItem('userId'), pagina: pagina, regxpagina: regxpagina }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_ConsultarHistoricoPrestamo.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {


          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))

        } else {
          reject({
            msg: codes.CODES.EMPTY_LOANHISTORYLIST
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  getAPAReference(isbn) {
    var bodydata = [{ appKey: appKey, codigoDeBarras: isbn }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_olib/APP_GenerarReferenciaBibliograficaApa.php', bodydata).then(response => {
        if (response.data[0].codigoEncontrado == true) {
          resolve(response.data)
        } else {
          reject({
            msg: codes.CODES.SEARCH_EMPTY.MSG
          })
        }
      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }
  getUserInfo() {
    var bodydata = [{ appKey: appKey, cedula: localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_ConsultarDetallesUsuario.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {
          let res = response.data[0].respuesta.split("\n").join("")
          resolve(JSON.parse(res)[0])

        } else {
          reject({
            msg: codes.CODES.SEARCH_EMPTY.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  getActiveLoans() {
    var bodydata = [{ appKey: appKey, cedula: /*'1000415486'*/localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_ConsultarPrestados.php', bodydata).then(response => {
        if (response.data[0].respuesta !== '[]') {


          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))

        } else {
          reject({
            msg: codes.CODES.EMPTY_LOANLIST
          })
        }
      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  renewLoan(barcode) {
    var bodydata = [{ appKey: appKey, cedula: /*'1000415486'*/localStorage.getItem('userId'), barcode: barcode }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_RenovarMaterial.php', bodydata).then(response => {
        if (response.data.respuesta == 'true') {
          resolve(response.data.mensaje)
        } else {
          reject({
            msg: response.data.mensaje
          })
        }
      }).catch(error => {
        console.log(error);
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }

  getRecommendations() {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_olib/APP_TitulosRecomendados.php', bodydata).then(response => {
        if (!response.data.errores) {
          resolve({
            authors: JSON.parse(response.data.titulos_autores.split("\n").join("")),
            user: JSON.parse(response.data.titulos_materias.split("\n").join("")),
            news: JSON.parse(response.data.titulos_nuevos.split("\n").join(""))
          })
        } else {
          reject({
            msg: codes.CODES.DEFAULT.MSG
          })
        }
      }).catch(error => {
        console.log(error);
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  consultarMaterialporCodigodeBarras(codigoDeBarras) {
    var bodydata = [{ appKey: appKey, codigoDeBarras: codigoDeBarras }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_olib/APP_ConsultarMaterialPorCodigoDeBarras.php', bodydata).then(response => {
        if (response.data.codigoEncontrado == true) {


          resolve(JSON.parse(response.data[0].respuesta.split("\n").join("")))


        } else {
          reject({
            msg: codes.CODES.ERROR_NOT_FOUND_BARCODE
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }

  searchesByUser() {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId') }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/biblioapp/services/listarbusquedasporusuario.php', bodydata).then(response => {
        if (response.data.length == 0) {
          reject({
            msg: codes.CODES.SEARCH_EMPTY.MSG
          })



        } else {
          resolve(response.data)
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  EliminarBusquedaPorUsuario(idBusqueda) {

    var bodydata = [{ appKey: appKey, idBusqueda: idBusqueda }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/biblioapp/services/EliminarBusquedaPorUsuarioSQL.php', bodydata).then(response => {


        resolve(response.data)



      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  GuardarBusquedaPorUsuario(documentoUsuario, busqueda) {

    var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario, busqueda: busqueda }];
    return new Promise((resolve, reject) => {
      this.postModelFormData('/biblioapp/services/GuardarBusquedaPorUsuario.php', bodydata).then(response => {


        resolve(response.data)



      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  reserveMaterial(titleno) {
    var bodydata = [{ appKey: appKey, cedula: localStorage.getItem('userId'), titleno: titleno }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_olib/APP_ReservarTitulo.php', bodydata).then(response => {
        if (response.data.length > 0) {
          let res = JSON.parse(JSON.stringify(response.data[0]))
          let message = JSON.parse(res.respuesta)
          if (message.length > 0) {
            if (message[0].reserva) {
              resolve({
                msg: message[0].mensaje
              })
            }
            reject({
              msg: message[0].mensaje
            })
          } else {
            reject({
              msg: codes.CODES.DEFAULT.MSG,
              error: null
            })
          }
        } else {
          reject({
            msg: codes.CODES.DEFAULT.MSG,
            error: null
          })
        }
      }).catch(error => {
        console.log(error);
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  removeReserve(reserva) {
    var bodydata = [{ appKey: appKey, cedula: localStorage.getItem('userId'), reserva: reserva }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/services_OLIB/APP_CancelarReserva.php', bodydata).then(response => {
        if (response.data.length > 0) {
          let res = JSON.parse(JSON.stringify(response.data[0]))
          let message = JSON.parse(res.respuesta)
          if (message.length > 0) {
            if (message[0].cancelada) {
              resolve()
            }
            reject({
              msg: codes.CODES.ERROR_DELETEBOOKING.MSG
            })
          } else {
            reject({
              msg: codes.CODES.DEFAULT.MSG,
              error: null
            })
          }
        } else {
          reject({
            msg: codes.CODES.DEFAULT.MSG,
            error: null
          })
        }
      }).catch(error => {
        console.log(error);
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })

  }
  validarusuarioportal(usuario, clave) {

    var bodydata = { usuario: usuario, clave: clave, loginApp: true };
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_globales/validarusuarioPortalInterface.php', bodydata).then(response => {


        resolve(response.data)



      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  validarusuarioportalLDAP(usuario, clave) {

    var bodydata = { usuario: usuario, clave: clave };
    return new Promise((resolve, reject) => {
      this.postModelFormData('/services_globales/validarusuarioLDAPInterface.php', bodydata).then(response => {


        resolve(response.data)



      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  getEventList() {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId'), miCuenta: "true" }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/programador/services/listareventosActivosApp.php', bodydata).then(response => {

        if (response.data.length !== 0) {
          //console.log(response.data)
          resolve(response.data)
        } else {
          reject({
            msg: codes.CODES.EMPTY_EVENTLIST.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  deleteEventListItem(idEvent) {
    var bodydata = [{ appKey: appKey, documentoUsuario: localStorage.getItem('userId'), idEvento: idEvent }];
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/programador/services/EliminarEventoPorUsuarioApp.php', bodydata).then(response => {
        //console.log(JSON.parse(response.data))    
        //if (response.data.resultadoEliminarBusqueda == true) {
        resolve(response.data)
        //   resolve(response.data.mensajeServicio)

        // } else {
        //   reject({
        //     msg: codes.CODES.ERROR_DELETEWISHLIST.MSG
        //   })
        // }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }
  getEventPublishedList() {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('isLogged')) {
        return reject({
          msg: codes.CODES.UNLOGGED_USER.MSG
        })
      }
      this.postModelFormData('/programador/services/ListarEventosPublicados.php').then(response => {

        if (response.data.length !== 0) {
          //console.log(response)
          resolve(response.data)
        } else {
          reject({
            msg: codes.CODES.EMPTY_EVENTPUBLISHEDLIST.MSG
          })
        }

      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.validarusuarioportal(username, password).then(res => {
        if (res.VALIDADO === true) {
          localStorage.setItem("userId", res.RESULTADO)
          localStorage.setItem("isLogged", res.VALIDADO.toString())
          localStorage.setItem('username', username)
          resolve()
        } else {
          this.validarusuarioportalLDAP(username, password).then(res2 => {
            if (res2.VALIDADOLDAP === true) {
              localStorage.setItem("userId", res2.RESULTADOLDAP)
              localStorage.setItem("isLogged", res2.VALIDADOLDAP.toString())
              localStorage.setItem('username', username)
              resolve()
            } else {
              reject({
                msg: res2.RESULTADOLDAP
              })
            }
          })
        }
      }).catch(error => {
        reject({
          msg: codes.CODES.DEFAULT.MSG,
          error
        })
      })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      localStorage.clear()
      //location.reload();
      resolve()
      /*this.postModel('/users/logout').then(response => {
          localStorage.removeItem('token');
          location.reload();
          resolve(response.data)
      }).catch(error => {
          reject({
              msg: codes.CODES.DEFAULT.MSG,
              error
          })
      })*/
    })
  }
}