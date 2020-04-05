import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <h1>Events</h1>
            </IonContent>
        </IonPage>
    )
}