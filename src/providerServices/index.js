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

    consultarCatalogo(busqueda) {

        var pagina = 1;
        var regxpagina = 10;
        var bodydata = [{ appKey: appKey, busqueda: busqueda, pagina: pagina, regxpagina: regxpagina }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_ConsultarCatalogo.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
                if (response.data[0].respuesta != '[]') {


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

    agregarListaDeseos(documentoUsuario, titleno) {
        var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario, titleno: titleno }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_AgregarAListaDeDeseos.php', bodydata).then(response => {
                if (response.data.resultadoGuardarBusqueda == true) {

                    resolve(response.data.mensajeServicio)

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
    eliminarListaDeseos(documentoUsuario, titleno) {
        var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario, titleno: titleno }];
        return new Promise((resolve, reject) => {
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

    listarDeseosUsuario(documentoUsuario) {
        var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_olib/APP_ListarDeseosPorUsuario.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
   ReservarTitulo(cedula, titleno){
        var bodydata = [{ appKey: appKey, cedula: cedula, titleno: titleno }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('services_olib/APP_ReservarTitulo.php', bodydata).then(response => {
                if (response.data.reserva != null) {

                    resolve(response.data.mensaje)

                } else {
                    reject({
                        msg: codes.CODES.ERROR_ADDBOOKING.MSG
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

    CancelarReserva(cedula, reserva){
        var bodydata = [{ appKey: appKey, cedula: cedula, reserva: reserva }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('services_olib/APP_CancelarReserva.php', bodydata).then(response => {
                if (response.data.cancelada == true){    

                    resolve(response.data.cancelada)
                    //msg: codes.CODES.BOOKING_CANCELED
                   

                } else {
                    reject({
                        msg: codes.CODES.ERROR_DELETEBOOKING.MSG
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
    consultarReservasActivas(cedula) {
        var bodydata = [{ appKey: appKey, cedula: cedula }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_ConsultarReservasActivas.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
    consultarHistoricoPrestamo(cedula) {
        var pagina = 1;
        var regxpagina = 10;
        var bodydata = [{ appKey: appKey, cedula: cedula, pagina: pagina, regxpagina: regxpagina }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_ConsultarHistoricoPrestamo.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
    generacionReferenciaAPA(codigoDeBarras) {
        var bodydata = [{ appKey: appKey, codigoDeBarras: codigoDeBarras }];
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
    consultarDetallesUsuario(cedula) {
        var bodydata = [{ appKey: appKey, cedula: cedula }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_ConsultarDetallesUsuario.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
    consultarPrestados(cedula) {
        var bodydata = [{ appKey: appKey, cedula: cedula }];
        return new Promise((resolve, reject) => {
            this.postModelFormData('/services_OLIB/APP_ConsultarPrestados.php', bodydata).then(response => {
                if (response.data[0].respuesta != '[]') {


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
    listarbusquedasporusuario(documentoUsuario) {

        var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario }];
        return new Promise((resolve, reject) => {
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

        var bodydata = [{ appKey: appKey, documentoUsuario: documentoUsuario, busqueda: busqueda}];
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
    login(user) {
        return new Promise((resolve, reject) => {
            this.postModel('/LoguearUsuarioReserva.php', user).then(response => {
                if (response.data.VALIDADO === true) {
                    localStorage.setItem('username', user.usuario)
                    resolve()
                } else {
                    reject({
                        msg: codes.CODES.LOGIN_FAILED.MSG
                    })
                }
                /*localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                axios.interceptors.request.use(function (config) {
                    const token = response.data.token;
                    config.headers.Authorization = token;
                    return config;
                });*/
            }).catch(error => {
                reject({
                    msg: codes.CODES.DEFAULT.MSG,
                    error
                })
            })
        })
    }

    logout() {
        return new Promise((resolve/*, reject*/) => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
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
