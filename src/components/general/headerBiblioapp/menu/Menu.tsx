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
  logOutOutline, 
  calendarOutline, 
  paperPlaneOutline, 
  informationCircleOutline, 
  laptopOutline, 
  personCircleOutline,
  bookOutline,
  listOutline,
  libraryOutline,
  schoolOutline,
  fileTrayFullOutline,
  homeOutline,
  businessOutline
} from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Menu.scss';
import SubMenu from './subMenu/SubMenu'
import logo from './../../../../assets/universidad/logo_verde.png'

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
}

interface AppPage {
  url?: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  urls?: Array<AppPage>;
}

const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/lobby',
    iosIcon: homeOutline,
    mdIcon: homeOutline
  },
  {
    title: 'Mi cuenta',
    url: '/myAccount',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline
  },
  {
    title: 'Servicios digitales',
    urls: [
      {
        title: 'Reserva de equipos',
        iosIcon: laptopOutline,
        mdIcon: laptopOutline,
        urls: [
          {
            title: 'Reservar',
            iosIcon: bookOutline,
            mdIcon: bookOutline,
            url: '/turnos/libraries'
          },
          {
            title: 'Mis reservas',
            iosIcon: listOutline,
            mdIcon: listOutline,
            url: '/turnos/myreservations'
          },
        ],
      },
      {
        title: 'Solicita material bibliografico',
        iosIcon: libraryOutline,
        mdIcon: libraryOutline,
        url: '/bibliographicMaterial'
      },
      {
        title: 'Repositorio institucional',
        iosIcon: schoolOutline,
        mdIcon: schoolOutline,
        url: '/institutionalRepository'
      },
      {
        title: 'Suministro de documentos',
        iosIcon: fileTrayFullOutline,
        mdIcon: fileTrayFullOutline,
        url: '/supplyDocuments'
      },
      {
        title: 'Reserva de espacios',
        iosIcon: businessOutline,
        mdIcon: businessOutline,
        url: '/spaceReservation'
      },
    ],
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneOutline
  },
  {
    title: 'Proximos eventos',
    url: '/events',
    iosIcon: calendarOutline,
    mdIcon: calendarOutline
  },
  {
    title: 'Biblioapp',
    url: '/biblioappInfo',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleOutline
  },
  
];
//onClick={()=>{appPage.isActive = true}}

const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage }) => {

  return (
    <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList lines="none" id="inbox-list">
            <div className="w-50 mx-auto">
              <IonImg src={logo} />
            </div>
            <SubMenu appPages={appPages} hidden={false} />
            <IonMenuToggle autoHide={false}>
              <IonItem 
                routerLink="/" 
                className="itemMenu" 
                routerDirection="none" 
                lines="none" 
                detail={false}
              >
                <IonIcon slot="start" icon={logOutOutline} />
                <IonLabel>Cerrar sesión</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
  );
};

export default withRouter(Menu);
