import React from 'react'
import { 
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardContent, 
  IonImg,
  IonTitle
} from '@ionic/react';
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
  let libraries = [
    {
      "id": 1,
      "name": "Biblioteca Carlos Gaviria Díaz",
      "image": "https://s3.eu-west-1.amazonaws.com/genial.ly/5ca4faaf0adf672ea5bc8dee/1eb05b6d-b556-43fc-b4f7-5cb81b6d7793.jpeg",
      url: '/turnos/libraries/carlosGaviria'
    },
    {
      "id": 2,
      "name": "Centro de Documentación de Artes",
      "image": "https://s3.eu-west-1.amazonaws.com/genial.ly/5ca4faaf0adf672ea5bc8dee/5107de9c-9de2-40d9-b9b5-922c9f2251be.jpeg",
      url: '/turnos/libraries/artes'
    }
  ]
  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        {
          libraries.map((library, index) => {
            return (
              <IonCard key={index} routerLink={library.url} >
                <IonCardHeader>
                  <IonImg src={library.image} />
                </IonCardHeader>
                <IonCardContent>
                  <IonTitle>{library.name}</IonTitle>
                </IonCardContent>
              </IonCard>
            )
          })
        }
      </IonContent>
    </IonPage>
  )
}