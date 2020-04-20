import axios from 'axios'
let codes = require('./responseCodes.js')

export default class ProviderService {

    constructor(rootAPI){
        this.rootAPI = rootAPI
        let token = localStorage.getItem('token');
        axios.interceptors.request.use(function (config) {
            config.headers.Authorization =  token;
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
    deleteModel(route){
        return axios.delete(`${this.rootAPI}/${route}`,  { /*headers: { "Authorization": this.accessToken },*/ withCredentials: true })
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
    postModel(route, data){
        return axios.post(`${this.rootAPI}${route}`, data,  { /*headers: { "Authorization": this.accessToken }, withCredentials: true */})
    }

    postModelFormData(route, bodyFormData){
        return axios({
            method: 'post',
            url: `${this.rootAPI}${route}`,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
    }

    /* Es la misma explicacion que el metodo postModel y deleteModel */
    patchModel(route, data){
        return axios.patch(`${this.rootAPI}${route}`, data, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
    }

    /* Es la misma explicacion que el metodo postModel y deleteModel */
    putModel(route, data){
        return axios.patch(`${this.rootAPI}${route}`, data, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
    }

    /* Es la misma explicacion que el metodo postModel y deleteModel */
    getModel(route, query) {
        let filter = query === null || query === undefined ? "" : `/?filter=${JSON.stringify(query)}`
        return axios.get(`${this.rootAPI}${route}${filter}`, { /*headers: { "Authorization": this.accessToken }, withCredentials: true*/ })
    }

    login(user) {
        return new Promise((resolve, reject) => {
            this.postModel('/LoguearUsuarioReserva.php', user).then(response => {
                if (response.data.VALIDADO === true) {
                    localStorage.setItem('username', user.usuario)
                    resolve()
                }else{
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
