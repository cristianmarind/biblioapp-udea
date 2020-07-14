import Menu from './components/general/headerBiblioapp/menu/Menu';
import PageLogin from './pages/login/PageLogin'
import PageUdeaLibraries from './pages/udeaLibraries/UdeaLibraries'
import PageUdeaDocCenters from './pages/udeaDocCenters/UdeaDocCenters'
import PageLobby from './pages/lobby/PageLobby'
import PageBiblioappInfo from './pages/biblioappInfo/PageBiblioappInfo'
import PageMyReservations from './pages/services/turnos/myReservations/PageMyReservations'
import PageReserve from './pages/services/turnos/libraries/carlosGaviria/reserve/PageReserve'
import PageMyAccount from './pages/user/PageMyAccount'
import PageActiveLoans from './pages/user/activeLoans/ActiveLoans'
import PageWishList from './pages/user/wishList/WishList'
import PageLoanHistory from './pages/user/loanHistory/LoanHistory'
import MyReservations from './pages/user/myReservations/MyReservations'
import PageEvents from './pages/events/PageEvents'
import PageLibraries from './pages/services/turnos/libraries/PageLibraries'
import PageBibliographicMaterial from './pages/services/bibliographicMaterial/PageBibliographicMaterial'
import PageInstitutionalRepository from './pages/services/institutionalRepository/PageInstitutionalRepository'
import PageSpaceReservation from './pages/services/spaceReservation/PageSpaceReservation'
import PageSupplyDocuments from './pages/services/supplyDocuments/PageSupplyDocuments'
import PageRequestTraining from './pages/services/requestTraining/RequestTraining'
import ElectronicResources from './pages/services/electronicResources/ElectronicResources'
import PageCarlosGaviria from './pages/services/turnos/libraries/carlosGaviria/PageCarlosGaviria'
import PageDefoultLibrary from './pages/services/turnos/libraries/defoultLibrary/DefoultLibrary'
import PageMaterialReviews from './pages/services/reviews/materialReviews/MaterialReviews'
import PageMyReviews from './pages/user/myReviews/MyReviews'
import PageMyEvents from './pages/user/myEvents/MyEvents'
import PageChat from './pages/services/chat/Chat'

import React, { useState } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import LoggedRoute from './utilities/router/LoggedRoute'
import UnloggedRoute from './utilities/router/UnloggedRoute'

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

/* Push Notifications */
import { Plugins } from '@capacitor/core';

const { PushNotifications } = Plugins;

/*localStorage.setItem('username', 'cristian.marind')
localStorage.setItem('userId', '1152701738')
localStorage.setItem('isLogged', 'true')*/




const App: React.FC = () => {

  const [notifications, setNotifications] = useState<any>([])

  PushNotifications.requestPermission().then((res: any) => {
    //alert(JSON.stringify(res))
    console.log(JSON.stringify(res));
    
  })
    
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: any) => {
        console.log(token);
        //alert(JSON.stringify(token))
      }
    );

    // Some issue with your setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert(JSON.stringify(error))
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: any) => {
       // alert("pushNotificationReceived" + JSON.stringify(notification))
        let notif = notifications;
        notif.push({ id: notification.id, title: notification.title, body: notification.body })
        setNotifications(notif)
        //alert(JSON.stringify(notif))
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: any) => {
        //alert("pushNotificationActionPerformed" + JSON.stringify(notification))
        let notif = notifications;
        notif.push({ id: notification.notification.data.id, title: notification.notification.data.title, body: notification.notification.data.body })
        setNotifications(notif)
        //alert(JSON.stringify(notif))
      }
    );

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" component={PageLobby} exact={true} />
            <UnloggedRoute path="/login" component={PageLogin} exact={true} />
            <Route path="/lobby" component={PageLobby} exact={true} />
            <Route path="/libraries" component={PageUdeaLibraries} exact={true} />
            <Route path="/docCenters" component={PageUdeaDocCenters} exact={true} />
            <Route path="/events" component={PageEvents} exact={true} />
            <Route path="/biblioappInfo" component={PageBiblioappInfo} exact={true} />
            <LoggedRoute path="/turnos/libraries" component={PageLibraries} exact={true} />
            <LoggedRoute path="/turnos/Reservar" component={PageReserve} exact={true} />
            <LoggedRoute path="/turnos/myreservations" component={PageMyReservations} exact={true} />
            <LoggedRoute path="/turnos/libraries/carlosGaviria" component={PageCarlosGaviria} exact={true} />
            <LoggedRoute path="/turnos/libraries/defoultLibrary" component={PageDefoultLibrary} exact={true} />
            <LoggedRoute path="/material/materiaReview" component={PageMaterialReviews} exact={true} />
            <Route path="/bibliographicSearcher" component={PageMyReservations} exact={true} />
            <Route path="/bibliographicMaterial" component={PageBibliographicMaterial} exact={true} />
            <Route path="/institutionalRepository" component={PageInstitutionalRepository} exact={true} />
            <Route path="/supplyDocuments" component={PageSupplyDocuments} exact={true} />
            <Route path="/spaceReservation" component={PageSpaceReservation} exact={true} />
            <Route path="/requestTraining" component={PageRequestTraining} exact={true} />
            <Route path="/electronicResources" component={ElectronicResources} exact={true} />
            <Route path="/chat" component={PageChat} exact={true} />
            <LoggedRoute path="/myAccount" component={PageMyAccount} exact={true} />
            <LoggedRoute path="/account/activeLoans" component={PageActiveLoans} exact={true} />
            <LoggedRoute path="/account/wishList" component={PageWishList} exact={true} />
            <LoggedRoute path="/account/loanHistory" component={PageLoanHistory} exact={true} />
            <LoggedRoute path="/account/myReservations" component={MyReservations} exact={true} />
            <LoggedRoute path="/account/myReviews" component={PageMyReviews} exact={true} />
            <LoggedRoute path="/account/myEvents" component={PageMyEvents} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

