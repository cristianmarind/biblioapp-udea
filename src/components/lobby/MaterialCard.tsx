import React from 'react'
import {  
  IonCard, 
  IonCardTitle,
  IonCardContent,
  IonText,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

export default (props:any) => {
    return (
      <IonCard>
        <IonCardHeader>
        <IonCardTitle>{ props.title }</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <img src={props.image || "https://www.iberlibro.com/imagenes/libros/cien-a%C3%B1os-de-soledad/textos.jpg"} alt="Img" />
              </IonCol>
              <IonCol size="8">
                <IonText>
                  {props.autores}
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    )
}