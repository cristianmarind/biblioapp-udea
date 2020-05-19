import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props: any) => {
    let routeIframe
    if (props.location.state) {
        routeIframe = `http://cirene.udea.edu.co/biblioapp/resenas/#!/${localStorage.getItem('userId')}/${props.location.state.titleno}/${props.location.state.title}/${localStorage.getItem('username')}`
    }
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <iframe 
                    title="Reseñas"
                    width="100%"
                    height="100%"
                    src={routeIframe}
                />
            </IonContent>
        </IonPage>
    )
}