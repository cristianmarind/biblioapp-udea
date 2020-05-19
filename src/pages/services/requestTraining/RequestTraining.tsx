import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <div className="custom-bg-fluorescent-green text-light text-center py-2">
                    Solicitud de capacitaciones
                </div>
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