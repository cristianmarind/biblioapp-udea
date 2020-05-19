import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <iframe 
                    title="Suministro de documentos"
                    width="100%"
                    height="100%"
                    src="http://cirene.udea.edu.co/suministros/#/" 
                />
            </IonContent>
        </IonPage>
    )
}