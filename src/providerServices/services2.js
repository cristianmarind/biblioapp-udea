//variables globales
var appKey = "UGT*Vh4e11@s";
var path = "http://cirene.udea.edu.co/";
var proxy='https://cors-anywhere.herokuapp.com/';
//llamados

//AgregarAListaDeDeseos(1020459010","1391226");
//EliminarDeListadeDeseos(1020459010","1391226");
//ListarDeseosPorUsuario("1020459010");
//ReservarTitulo(1020459010","1391226");
//ConsultarReservasActivas("1020459010");
//GenerarReferenciaBibliograficaApa(9789587143638");
//ConsultarDetallesTitulo("1276093");
//ConsultarDetallesUsuario(1055831540");
//ConsultarCatalogo(torero","2","20");
//ConsultarPrestados(1020459010");
//ConsultarMaterialPorCodigoDeBarras(9789587143638");

//listarbusquedasporusuario("1020459010");
//GuardarBusquedaPorUsuario(1020459010","gabriel garcia");
//EliminarBusquedaPorUsuario(923);

//listareventosActivosApp(1020459010",false);
//EliminarEventoPorUsuarioApp(1020459010","1234");
//RegistrarUsuarioEnEventoApp(1020459010","1234","4321");

//ListaNotificacionesXUsuarioAPP(1020459010");

//funciones

//servicios OLIB

export default {
    ConsultarDetallesTitulo(titleno) {
        var data = [{ appKey: appKey, titleno: titleno }];
        //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"titleno\":\"1276093\"}\n]\n";
    
        var xhr = new XMLHttpRequest();
         
    
        xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarDetallesTitulo.php");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
         
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.response);
                return this.response;
            }
        });
    
        xhr.send(JSON.stringify(data));
    },
    ConsultarCatalogo(busqueda, pagina, regxpagina) {
        
        var data = [{ appKey: appKey, busqueda: busqueda, pagina: pagina, regxpagina: regxpagina }];
        //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"busqueda\":\"torero\",\n	\"pagina\": \"1\",\n	\"regxpagina\":\"20\"\n	}\n]\n";
    
        var xhr = new XMLHttpRequest();
         
    
        xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarCatalogo.php");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
         
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                return JSON.parse(this.response);
            }
        });
    
        xhr.send(JSON.stringify(data));
    }
}
/*
function AgregarAListaDeDeseos(documento, titleno) {
    //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"documentoUsuario\":\"1020459010\",\n	\"titleno\":\"1391226\"\n	}\n]\n";
    var data = [{ appKey: appKey, documentoUsuario: documento, titleno: titleno }];
    var xhr = new XMLHttpRequest();
     
    xhr.open("POST",  proxy+path + "services_OLIB/APP_AgregarAListaDeDeseos.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function EliminarDeListadeDeseos(documento, titleno) {
    var data = [{ appKey: appKey, documentoUsuario: documento, titleno: titleno }];

    var xhr = new XMLHttpRequest();
     
    xhr.open("POST",  proxy+path + "services_olib/APP_EliminarDeListadeDeseos.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));

}
function ListarDeseosPorUsuario(documento) {

    var data = [{ appKey: appKey, documentoUsuario: documento }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_olib/APP_ListarDeseosPorUsuario.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));

}

function ReservarTitulo(documento, titleno) {
    var data = [{ appKey: appKey, cedula: documento, titleno: titleno }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_olib/APP_ReservarTitulo.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}

function ConsultarReservasActivas(documento) {
    var data = [{ appKey: appKey, cedula: documento }];

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarReservasActivas.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function GenerarReferenciaBibliograficaApa(codigoDeBarras) {
    var data = [{ appKey: appKey, codigoDeBarras: codigoDeBarras }];
    //var data = JSON.stringify([{ "appKey": "UGT*Vh4e11@s", "codigoDeBarras": "9789587143638" }]);

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_olib/APP_GenerarReferenciaBibliograficaApa.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function ConsultarDetallesTitulo(titleno) {
    var data = [{ appKey: appKey, titleno: titleno }];
    //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"titleno\":\"1276093\"}\n]\n";

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarDetallesTitulo.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function ConsultarDetallesUsuario(cedula) {
    var data = [{ appKey: appKey, cedula: cedula }];
    //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"cedula\":\"1055831540\"\n	}\n]\n";

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarDetallesUsuario.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function ConsultarCatalogo(busqueda, pagina, regxpagina) {
    var data = [{ appKey: appKey, busqueda: busqueda, pagina: pagina, regxpagina: regxpagina }];
    //var data = "[\n	{\"appKey\":\"UGT*Vh4e11@s\",\n	\"busqueda\":\"torero\",\n	\"pagina\": \"1\",\n	\"regxpagina\":\"20\"\n	}\n]\n";

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarCatalogo.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function ConsultarPrestados(cedula) {
    var data = [{ appKey: appKey, cedula: cedula }];

    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_OLIB/APP_ConsultarPrestados.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));

}
function ConsultarMaterialPorCodigoDeBarras(codigoDeBarras) {
    var data = [{ appKey: appKey, codigoDeBarras: codigoDeBarras }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "services_olib/APP_ConsultarMaterialPorCodigoDeBarras.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}


//biblioapp
function listarbusquedasporusuario(documento) {

    var data = [{ appKey: appKey, documentoUsuario: documento }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "biblioapp/services/listarbusquedasporusuario.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function GuardarBusquedaPorUsuario(documentoUsuario, busqueda) {
    var data = [{ appKey: appKey, documentoUsuario: documentoUsuario, busqueda: busqueda }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path + "biblioapp/services/GuardarBusquedaPorUsuario.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}
function EliminarBusquedaPorUsuario(idBusqueda) {
    var data = [{ appKey: appKey, idBusqueda: idBusqueda }];
    var xhr = new XMLHttpRequest();
     


    xhr.open("POST",  proxy+path + "biblioapp/services/EliminarBusquedaPorUsuarioSQL.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}

//programador
function listareventosActivosApp(documentoUsuario, miCuenta) {
    var data = [{ appKey: appKey, documentoUsuario: documentoUsuario,miCuenta:miCuenta }];
    var xhr = new XMLHttpRequest();
              

    xhr.open("POST",  proxy+path+"programador/services/listareventosActivosApp.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}

function EliminarEventoPorUsuarioApp(documentoUsuario,idEvento) {
    var data = [{ appKey: appKey, documentoUsuario: documentoUsuario,idEvento:idEvento }];
    var xhr = new XMLHttpRequest();
                

    xhr.open("POST",  proxy+path+"programador/services/EliminarEventoPorUsuarioApp.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}


function RegistrarUsuarioEnEventoApp(documentoUsuario,idEvento,idGoogleCalendar) {
    var data = [{ appKey: appKey, documentoUsuario: documentoUsuario,idEvento:idEvento,idGoogleCalendar:idGoogleCalendar }];
    var xhr = new XMLHttpRequest();
     

    xhr.open("POST",  proxy+path+"programador/services/RegistrarUsuarioEnEventoApp.php");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}

//notificacionesApp

function ListaNotificacionesXUsuarioAPP(documentoUsuario) {
    var data = [{ appKey: appKey, documentoUsuario: documento }];
    var xhr = new XMLHttpRequest();
     

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST",  proxy+path+"notificacionesApp/services/ListaNotificacionesXUsuarioAPP.PHP");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
     
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            return this.response;
        }
    });

    xhr.send(JSON.stringify(data));
}**/