import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <div className="custom-bg-fluorescent-green text-light text-center py-2">
                    Solicita material bibliográfico
                </div>
                <iframe 
                    title="Solicita material bibliografico"
                    width="100%"
                    height="100%"
                    src="http://cirene.udea.edu.co/seleccion/#/inicioPortal" 
                />
            </IonContent>
        </IonPage>
    )
}