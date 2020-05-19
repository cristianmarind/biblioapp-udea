import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <div className="custom-bg-fluorescent-green text-light text-center py-2">
                    Reserva de espacios
                </div>
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