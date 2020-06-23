import React from 'react'
import { useHistory } from "react-router-dom";
import { IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle, IonIcon } from '@ionic/react';
import { 
  arrowBackOutline,
  menuOutline
 } from 'ionicons/icons';
//import menuLogo from './../../../assets/biblioapp/icons/menu.png'


const BiblioappInfo = (props:any) => {
  let history = useHistory();
  const routes = [
    {
      route: '/myAccount',
      title: 'Mi cuenta',
      backActive: false
    },
    {
      route: '/turnos/libraries',
      title: 'Reserva de equipos',
      backActive: false
    },
    {
      route: '/turnos/libraries/carlosGaviria',
      title: 'Reserva de equipos',
      backActive: true
    },
    {
      route: '/turnos/libraries/defoultLibrary',
      title: 'Reserva de equipos',
      backActive: true
    },
    {
      route: '/turnos/Reservar',
      title: 'Reserva de equipos',
      backActive: true
    },
    {
      route: '/turnos/myreservations',
      title: 'Mis reservas',
      backActive: false
    },
    {
      route: '/electronicResources',
      title: 'Recursos electrónicos',
      backActive: false
    },
    {
      route: '/bibliographicMaterial',
      title: 'Solicita material bibliográfico',
      backActive: false
    },
    {
      route: '/institutionalRepository',
      title: 'Repositorio institucional',
      backActive: false
    },
    {
      route: '/supplyDocuments',
      title: 'Conmutación bibliográfica',
      backActive: false
    },
    {
      route: '/spaceReservation',
      title: 'Reserva de espacios',
      backActive: false
    },
    {
      route: '/requestTraining',
      title: 'Solicitud de capacitaciones',
      backActive: false
    },
    {
      route: '/account/wishList',
      title: 'Mi lista de deseos',
      backActive: true
    },
    {
      route: '/account/activeLoans',
      title: 'Mis prestamos activos',
      backActive: true
    },
    {
      route: '/account/loanHistory',
      title: 'Historial de prestamos',
      backActive: true
    },
    {
      route: '/account/myReservations',
      title: 'Mis reservas',
      backActive: true
    },
    {
      route: '/libraries',
      title: 'Bibliotecas UdeA',
      backActive: false
    },
    {
      route: '/docCenters',
      title: 'Centros de documentación UdeA',
      backActive: false
    },
    {
      route: '/account/myEvents',
      title: 'Mis eventos',
      backActive: true
    },
    {
      route: '/events',
      title: 'Eventos',
      backActive: false
    }
  ]
  const currentRoute = routes.find(r => {
    return r.route == window.location.pathname
  })
  //console.log(title);

  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton>
            <div className="custom-icon d-flex align-items-center m-0 p-2 custom-text-fluorescent-green">
              <IonIcon icon={menuOutline} />
            </div>
          </IonMenuButton>
        </IonButtons>
        <IonTitle>BiblioApp UdeA</IonTitle>
      </IonToolbar>
      <div className="custom-bg-fluorescent-green text-light text-center p-2 d-flex align-items-center">
        {
          currentRoute?.backActive?
          (<IonIcon 
            className="mx-1"
            icon={arrowBackOutline} 
            onClick={() => {
              history.goBack()
            }}
          />):null
        }
        {currentRoute?.title}
      </div>
    </IonHeader>
  )
}

export default BiblioappInfo