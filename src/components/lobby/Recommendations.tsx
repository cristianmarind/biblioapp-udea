import React from 'react'
import TextMaxSize from "./../general/textMaxSize/TextMaxSize"
import {
  IonCard,
  IonCardHeader,
  IonTitle,
  IonCardContent,
  IonCardSubtitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
} from '@ionic/react';
import { 
  Tabs,
  Tab
} from 'react-bootstrap';

export default () => {
  return (
    <div>
      <IonTitle className="custom-text-green font-weight-bold">Recomendaciones</IonTitle>
      <Tabs defaultActiveKey="forYou" id="uncontrolled-tab-example">
        <Tab eventKey="forYou" title="Para ti">
          <IonGrid className="p-0">
            <IonRow>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://i.pinimg.com/564x/53/8c/06/538c06006b8d431ac1dca2fa095de66d.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Cien Años de Soledad" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Gabriel García Márquez" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://ep01.epimg.net/cultura/imagenes/2013/06/15/actualidad/1371283072_174122_1371283573_noticia_normal.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Don Quijote de la mancha" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Miguel de Cervantes Saavedra" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Tab>
        <Tab eventKey="recent" title="Reciente">
          <IonGrid className="p-0">
            <IonRow>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://i.pinimg.com/564x/53/8c/06/538c06006b8d431ac1dca2fa095de66d.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Cien Años de Soledad" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Gabriel García Márquez" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://ep01.epimg.net/cultura/imagenes/2013/06/15/actualidad/1371283072_174122_1371283573_noticia_normal.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Don Quijote de la mancha" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Miguel de Cervantes Saavedra" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Tab>
        <Tab eventKey="authors" title="Autores">
          <IonGrid className="p-0">
            <IonRow>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://i.pinimg.com/564x/53/8c/06/538c06006b8d431ac1dca2fa095de66d.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Cien Años de Soledad" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Gabriel García Márquez" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
              <IonCol size="6" className="p-0">
                <IonCard className="h-100 border custom-border-color-green">
                  <IonCardContent>
                    <IonImg className="mx-auto" src='https://ep01.epimg.net/cultura/imagenes/2013/06/15/actualidad/1371283072_174122_1371283573_noticia_normal.jpg' />
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle><TextMaxSize sizeDefault="20" text="Don Quijote de la mancha" /></IonCardTitle>
                    <IonCardSubtitle><TextMaxSize sizeDefault="30" text="Miguel de Cervantes Saavedra" /></IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Tab>
      </Tabs>
    </div>
  )
}