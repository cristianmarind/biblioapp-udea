import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props:any) => {
    return (
        <IonPage>
            <HeaderBiblioapp history={props.history} />
            <IonContent>
                <iframe 
                    title="Recursos electrónicos "
                    width="100%"
                    height="100%"
                    src="http://cirene.udea.edu.co/basesdedatosapp" 
                />
            </IonContent>
        </IonPage>
    )
}