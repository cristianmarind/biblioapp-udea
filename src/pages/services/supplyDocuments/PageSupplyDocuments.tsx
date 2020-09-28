import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default (props:any) => {
    return (
        <IonPage>
            <HeaderBiblioapp history={props.history} />
            <IonContent>
                <iframe 
                    title="Suministro de documentos"
                    width="100%"
                    height="100%"
                    src="https://cirene.udea.edu.co/suministros/#/registrarsolicitudPortal" 
                />
            </IonContent>
        </IonPage>
    )
}