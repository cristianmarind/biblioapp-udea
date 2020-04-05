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
  fileTrayFullOutline
} from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import './Menu.css';
import SubMenu from './subMenu/SubMenu'

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
    title: 'Mi cuenta',
    url: '/myAccount',
    iosIcon: personCircleOutline,
    mdIcon: personCircleOutline
  },
  {
    title: 'Servicios',
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
            <div className="w-75 mx-auto">
              <IonImg src="https://d3q0kt5yih1b7n.cloudfront.net/organizations/covers/universidad-de-antioquia_8781395682.jpg" />
            </div>
            <SubMenu appPages={appPages} hidden={false} />
            <IonMenuToggle className="" autoHide={false}>
              <IonItem className="itemMenu" routerDirection="none" lines="none" detail={false}>
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
