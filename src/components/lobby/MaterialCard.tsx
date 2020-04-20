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
import TextMaxSize from "./../general/textMaxSize/TextMaxSize"

export default (props:any) => {
  let authors, isbn, count, description
  
  if (props.isbn) {
    isbn = (
      <div>
        <span className="custom-text-green font-weight-bold">ISBN: </span>
        <span>{props.isbn}</span>
      </div>
    )
  }
  if (parseInt(props.count)) {
    count = (
      <div>
        <span className="custom-text-green font-weight-bold">Número ejemplares: </span>
        <span>{props.count}</span>
      </div>
    )
  }
  if (props.autores) {
    authors = (
      <div>
        <span className="custom-text-green font-weight-bold">Autores: </span>
        <TextMaxSize sizeDefault="80" text={props.autores} />
      </div>
    )
  }
  if (props.description) {
    description = (
      <div>
        <span className="custom-text-green font-weight-bold">Información: </span>
        <TextMaxSize sizeDefault="80" text={props.description} labelVisible={false} />
      </div>
    )
  }

  return (
    <IonCard className="border custom-border-color-green">
      <IonCardHeader>
        <IonCardTitle className="custom-text-green font-weight-bold">
          <TextMaxSize sizeDefault="49" text={props.title} />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="4">
              <img src={props.image || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
            </IonCol>
            <IonCol size="8">
              <IonText>
                { authors }
                { isbn }
                { count }
                { description }
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  )
}