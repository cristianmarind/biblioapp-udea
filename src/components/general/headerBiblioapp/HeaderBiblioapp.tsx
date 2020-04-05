import React from 'react'
import { IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle } from '@ionic/react';



const BiblioappInfo = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>BiblioApp UdeA</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default BiblioappInfo