import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonImg,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import { 
  logInOutline,
  businessOutline
} from 'ionicons/icons';
import React from 'react';
import { menuController } from '@ionic/core';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import './Menu.scss';
import SubMenu from './subMenu/SubMenu'
import logo from './../../../../assets/universidad/logo_horizontal_blanco.png'
import biblioappLogo from './../../../../assets/biblioapp/blanco.png'
import logoutLogo from './../../../../assets/biblioapp/icons/cerrar.png'
import lobbyLogo from './../../../../assets/biblioapp/icons/inicio.png'
import electronicResourcesLogo from './../../../../assets/biblioapp/icons/resursos-electronicos.png'
import servicesLogo from './../../../../assets/biblioapp/icons/servicios.png'
import userLogo from './../../../../assets/biblioapp/icons/usuario.png'
import institutionalRepositoryLogo from './../../../../assets/biblioapp/icons/repositorio.png'
import myReservationsLogo from './../../../../assets/biblioapp/icons/mis-reservas.png'
import turnosLogo from './../../../../assets/biblioapp/icons/reserva1.png'
import reserveLogo from './../../../../assets/biblioapp/icons/reserva-2.png'
import supplyDocumentsLogo from './../../../../assets/biblioapp/icons/suministro.png'
import udeaLibrariesLogo from './../../../../assets/biblioapp/icons/libro-2.png'
import biblioappInfoLogo from './../../../../assets/biblioapp/icons/informacion.png'
import eventsLogo from './../../../../assets/biblioapp/icons/eventos.png'
import requestTrainingLogo from './../../../../assets/biblioapp/icons/capacitaciones.png'
import chat from './../../../../assets/biblioapp/icons/chat.png'

import HOSTS from './../../../../providerServices/hosts.js'
import ProviderServices from './../../../../providerServices/index'

let services = new ProviderServices(HOSTS.CIRENE.HOST)


interface AppPage {
  url?: string;
  icon: string;
  title: string;
  urls?: Array<AppPage>;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/lobby',
    icon: lobbyLogo,
  },
  {
    title: 'Mi cuenta',
    url: '/myAccount',
    icon: userLogo,
  },
  {
    title: 'Servicios digitales',
    icon: servicesLogo,
    urls: [
      {
        title: 'Chatea con nosotros',
        icon: chat,
        url: '/chat'
      },
      {
        title: 'Reserva de equipos',
        icon: turnosLogo,
        urls: [
          {
            title: 'Reservar',
            icon: reserveLogo,
            url: '/turnos/libraries'
          },
          {
            title: 'Mis reservas',
            icon: myReservationsLogo,
            url: '/turnos/myreservations'
          },
        ],
      },
      {
        title: 'Recursos electrónicos',
        icon: electronicResourcesLogo,
        url: '/electronicResources'
      },
      {
        title: 'Solicita material bibliografico',
        icon: udeaLibrariesLogo,
        url: '/bibliographicMaterial'
      },
      {
        title: 'Repositorio institucional',
        icon: institutionalRepositoryLogo,
        url: '/institutionalRepository'
      },
      {
        title: 'Conmutación bibliográfica',
        icon: supplyDocumentsLogo,
        url: '/supplyDocuments'
      },
      /*{
        title: 'Reserva de espacios',
        icon: businessOutline,
        url: '/spaceReservation'
      },*/
      {
        title: 'Solicitud de capacitaciones',
        icon: requestTrainingLogo,
        url: '/requestTraining'
      },
    ]
  },
  {
    title: 'Próximos eventos',
    url: '/events',
    icon: eventsLogo,
  },
  {
    title: 'Bibliotecas UdeA',
    url: '/libraries',
    icon: udeaLibrariesLogo,
  },
  {
    title: 'Centros de documentación',
    url: '/docCenters',
    icon: udeaLibrariesLogo,
  },
  {
    title: 'Biblioapp',
    url: '/biblioappInfo',
    icon: biblioappInfoLogo,
  },
  
];
//onClick={()=>{appPage.isActive = true}}

const Menu: React.FunctionComponent<any> = (props) => {
  let loginItem, logoutItem
  if (localStorage.getItem('isLogged')) {
    logoutItem = (
      <IonItem 
        className="itemMenu bg-transparent text-light" 
        lines="none" 
        detail={false}
        onClick={() => {
          services.logout().then(() => {
            menuController.close()
            props.history.push("/")
          })
        }}
      >
        <div className="custom-icon mr-2">
          <IonImg src={logoutLogo} />
        </div>
        <IonLabel>Cerrar sesión</IonLabel>
      </IonItem>
    )
  }else{
    loginItem = (
      <IonMenuToggle>
        <IonItem 
        className="itemMenu bg-transparent text-light" 
        routerLink="/login"
        routerDirection="none" 
        lines="none" 
        detail={false}
      >
        <div className="custom-icon mr-2">
          <IonIcon icon={logInOutline} className="text-light" />
        </div>
        <IonLabel>Iniciar sesión</IonLabel>
      </IonItem>
      </IonMenuToggle>
      
    )
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent className="custom-bg-green text-light">
        <IonList className="bg-transparent" lines="none" id="inbox-list">
          <div className="mx-auto px-3 mb-3">
            <IonImg src={logo} />
          </div>
          <div className="pl-2">
            { loginItem }
            <SubMenu history={props.history} appPages={appPages} hidden={false} />
            { logoutItem }

          </div>
          <div className="mx-auto mb-3">
            <IonImg src={biblioappLogo} />
          </div>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
