import React from 'react'
import { IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle, IonImg, IonIcon, IonBackButton } from '@ionic/react';
import { 
  arrowBackOutline,
  menuOutline
 } from 'ionicons/icons';
//import menuLogo from './../../../assets/biblioapp/icons/menu.png'


const BiblioappInfo = (props:any) => {
  const routes = [
    {
      route: '/myAccount',
      title: 'Mi cuenta'
    },
    {
      route: '/turnos/libraries',
      title: 'Reserva de equipos'
    },
    {
      route: '/turnos/libraries/carlosGaviria',
      title: 'Reserva de equipos'
    },
    {
      route: '/turnos/libraries/defoultLibrary',
      title: 'Reserva de equipos'
    },
    {
      route: '/turnos/Reservar',
      title: 'Reserva de equipos'
    },
    {
      route: '/turnos/myreservations',
      title: 'Mis reservas'
    },
    {
      route: '/electronicResources',
      title: 'Recursos electrónicos'
    },
    {
      route: '/bibliographicMaterial',
      title: 'Solicita material bibliográfico'
    },
    {
      route: '/institutionalRepository',
      title: 'Repositorio institucional'
    },
    {
      route: '/supplyDocuments',
      title: 'Suministro de documentos'
    },
    {
      route: '/spaceReservation',
      title: 'Reserva de espacios'
    },
    {
      route: '/requestTraining',
      title: 'Solicitud de capacitaciones'
    },
    {
      route: '/account/wishList',
      title: 'Mi lista de deseos'
    },
    {
      route: '/account/activeLoans',
      title: 'Mis prestamos activos'
    },
    {
      route: '/account/loanHistory',
      title: 'Historial de prestamos'
    },
    {
      route: '/account/myReservations',
      title: 'Mis reservas'
    },
    {
      route: '/libraries',
      title: 'Bibliotecas UdeA'
    },
    {
      route: '/docCenters',
      title: 'Centros de documentación UdeA'
    }
  ]
  const currentRoute = routes.find(r => {
    return r.route == props.history.location.pathname
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
        <IonIcon 
          className="mx-1"
          icon={arrowBackOutline} 
          onClick={() => {
            props.history.goBack()
          }}
        />
        {currentRoute?.title}
      </div>
    </IonHeader>
  )
}

export default BiblioappInfo