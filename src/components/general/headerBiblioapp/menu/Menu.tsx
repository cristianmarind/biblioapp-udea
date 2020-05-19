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
  calendarOutline, 
  informationCircleOutline, 
  laptopOutline, 
  bookOutline,
  libraryOutline,
  fileTrayFullOutline,
  homeOutline,
  businessOutline,
  pencilOutline,
  codeDownloadOutline
} from 'ionicons/icons';
import React from 'react';
import { menuController } from '@ionic/core';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import './Menu.scss';
import SubMenu from './subMenu/SubMenu'
import logo from './../../../../assets/universidad/logo_verde.png'
import logoutLogo from './../../../../assets/biblioapp/icons/cerrar.png'
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


import ProviderServices from './../../../../providerServices/index'

let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

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
    icon: homeOutline,
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
        icon: codeDownloadOutline,
        url: '/electronicResources'
      },
      {
        title: 'Solicita material bibliografico',
        icon: libraryOutline,
        url: '/bibliographicMaterial'
      },
      {
        title: 'Repositorio institucional',
        icon: institutionalRepositoryLogo,
        url: '/institutionalRepository'
      },
      {
        title: 'Suministro de documentos',
        icon: supplyDocumentsLogo,
        url: '/supplyDocuments'
      },
      {
        title: 'Reserva de espacios',
        icon: businessOutline,
        url: '/spaceReservation'
      },
      {
        title: 'Solicitud de capacitaciones',
        icon: pencilOutline,
        url: '/requestTraining'
      },
    ]
  },
  {
    title: 'Proximos eventos',
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

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {
  const history = useHistory();
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
            history.push("/")
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
        className="itemMenu bg-transparent" 
        routerLink="/"
        routerDirection="none" 
        lines="none" 
        detail={false}
      >
        <IonIcon color="white" slot="start" icon={logInOutline} />
        <IonLabel>Iniciar sesión</IonLabel>
      </IonItem>
      </IonMenuToggle>
      
    )
  }
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent className="custom-bg-green text-light">
        <IonList className="bg-transparent" lines="none" id="inbox-list">
          <div className="mx-auto">
            <IonImg src={logo} />
          </div>
          { loginItem }
          <SubMenu appPages={appPages} hidden={false} />
          { logoutItem }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
