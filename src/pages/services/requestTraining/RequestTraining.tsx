import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props:any) => {
    return (
        <IonPage>
            <HeaderBiblioapp history={props.history} />
            <IonContent>
                <iframe 
                    title="Solicitud de capacitaciones"
                    width="100%"
                    height="100%"
                    src="https://docs.google.com/forms/d/e/1FAIpQLSf6DPAlze9bxdZfaQe5lAadjrMNdNdqPHQLwR1gUjHvTf3NoQ/closedform?embedded=true" 
                />
            </IonContent>
        </IonPage>
    )
}