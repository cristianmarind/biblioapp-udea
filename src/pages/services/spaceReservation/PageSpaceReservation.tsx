import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props:any) => {
    return (
        <IonPage>
            <HeaderBiblioapp history={props.history} />
            <IonContent>
                <iframe 
                    title="Reserva de espacios"
                    width="100%"
                    height="100%"
                    src="https://docs.google.com/forms/d/e/1FAIpQLScls4nKaaqKJp-uD0eaCJl44En92hJD1I1fvMyJGDHQJrD3OQ/viewform" 
                />
            </IonContent>
        </IonPage>
    )
}