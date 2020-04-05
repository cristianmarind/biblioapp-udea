import React from 'react'
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonCardTitle,
  IonCardSubtitle
} from '@ionic/react';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        <IonCard>
        <div className="imgUdeA">
            <IonImg src="https://lh3.googleusercontent.com/JqnKD22aMVQfj2OkAn4IKdX_9h91247ftyAKZeLCMYVUzTe3vSu1wo56mRh5nXL392VZ" />
          </div>
          <IonCardHeader>
            <IonCardSubtitle>Version 4.0.0</IonCardSubtitle>
            <IonCardTitle>BiblioApp</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Universidad de Antioquia <br />
            Sistema de bibliotecas <br />
            Gestion de T.I
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
    )
}