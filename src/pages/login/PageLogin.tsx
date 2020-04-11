import React from 'react'
import { IonPage, IonContent, IonList, IonImg, IonTitle, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react'
import logoVerde from './../../assets/universidad/logo_verde.png'

export default () => {
    return (
        <IonPage>
            <IonContent>
                <IonList className="px-4">
                    <IonImg className="w-50 mx-auto" src={logoVerde} />
                    <IonTitle color="primary" className="text-center mb-2">Biblioapp UdeA</IonTitle>
                    <IonItem>
                      <IonLabel position="floating">
                        Usuario
                      </IonLabel>
                      <IonInput type="text" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="floating">
                        Contraseña
                      </IonLabel>
                      <IonInput type="password" />
                    </IonItem>
                    <IonButton 
                      routerLink="/lobby" 
                      className="mt-3"
                      color="primary" 
                      expand="block"
                    >
                      Iniciar sesión
                    </IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    )
}