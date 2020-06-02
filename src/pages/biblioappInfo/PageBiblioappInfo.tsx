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
import logoVerde from './../../assets/universidad/logo_verde.png'
import biblioappLogo from './../../assets/biblioapp/azul.png'

export default () => {
  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        <IonCard>
          <IonImg src={biblioappLogo} />
          <IonCardHeader>
            <IonCardSubtitle>Version 4.1.3</IonCardSubtitle>
            <IonCardTitle>BiblioApp</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Universidad de Antioquia <br />
            Sistema de bibliotecas <br />
            Gestion de T.I
          </IonCardContent>
          <IonImg src={logoVerde} />
        </IonCard>
      </IonContent>
    </IonPage>
    )
}