import Menu from './components/general/headerBiblioapp/menu/Menu';
import PageLogin from './pages/login/PageLogin'
import PageLobby from './pages/lobby/PageLobby'
import PageBiblioappInfo from './pages/biblioappInfo/PageBiblioappInfo'
import PageMyReservations from './pages/services/turnos/myReservations/PageMyReservations'
import PageReserve from './pages/services/turnos/reserve/PageReserve'
import PageMyAccount from './pages/user/PageMyAccount'
import PageEvents from './pages/events/PageEvents'
import PageLibraries from './pages/services/turnos/libraries/PageLibraries'
import PageBibliographicMaterial from './pages/services/bibliographicMaterial/PageBibliographicMaterial'
import PageInstitutionalRepository from './pages/services/institutionalRepository/PageInstitutionalRepository'
import PageSpaceReservation from './pages/services/spaceReservation/PageSpaceReservation'
import PageSupplyDocuments from './pages/services/supplyDocuments/PageSupplyDocuments'
import PageCarlosGaviria from './pages/services/turnos/libraries/carlosGaviria/PageCarlosGaviria'
import PageArtes from './pages/services/turnos/libraries/artes/PageArtes'

import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Custom styles */
import './theme/customStyles.scss'

localStorage.setItem('username', 'cristian.marind')

const App: React.FC = () => {

  const [selectedPage] = useState('');

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={selectedPage} />
          <IonRouterOutlet id="main">
            <Route path="/" component={PageLogin} exact={true} />
            <Route path="/lobby" component={PageLobby} exact={true} />
            <Route path="/myAccount" component={PageMyAccount} exact={true} />
            <Route path="/events" component={PageEvents} exact={true} />
            <Route path="/biblioappInfo" component={PageBiblioappInfo} exact={true} />
            <Route path="/turnos/libraries" component={PageLibraries} exact={true} />
            <Route path="/turnos/Reservar" component={PageReserve} exact={true} />
            <Route path="/turnos/myreservations" component={PageMyReservations} exact={true} />
            <Route path="/turnos/libraries/carlosGaviria" component={PageCarlosGaviria} exact={true} />
            <Route path="/turnos/libraries/artes" component={PageArtes} exact={true} />
            <Route path="/bibliographicSearcher" component={PageMyReservations} exact={true} />
            <Route path="/bibliographicMaterial" component={PageBibliographicMaterial} exact={true} />
            <Route path="/institutionalRepository" component={PageInstitutionalRepository} exact={true} />
            <Route path="/supplyDocuments" component={PageSupplyDocuments} exact={true} />
            <Route path="/spaceReservation" component={PageSpaceReservation} exact={true} />
         </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
