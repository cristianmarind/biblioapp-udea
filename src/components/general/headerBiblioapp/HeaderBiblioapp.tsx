import React from 'react'
import { IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle, IonImg } from '@ionic/react';
import menuLogo from './../../../assets/biblioapp/icons/menu.png'



const BiblioappInfo = () => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton>
            <div className="custom-icon d-flex align-items-center m-0 p-2">
              <IonImg src={menuLogo} />
            </div>
          </IonMenuButton>
        </IonButtons>
        <IonTitle>BiblioApp UdeA</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default BiblioappInfo