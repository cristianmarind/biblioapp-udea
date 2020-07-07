import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props:any) => {
    return (
        <IonPage>
            <HeaderBiblioapp history={props.history} />
            <IonContent>
                <iframe 
                    title="Chatea con un bibliotecario"
                    width="100%"
                    height="100%"
                    src="https://tawk.to/chat/56af8d50d30e6a9b5f57d09d/1abas8slf" 
                />
            </IonContent>
        </IonPage>
    )
}