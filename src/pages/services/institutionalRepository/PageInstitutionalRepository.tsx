import React from 'react'
import { IonPage, IonContent } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

export default () => {
    return (
        <IonPage>
            <HeaderBiblioapp />
            <IonContent>
                <div className="custom-bg-fluorescent-green text-light text-center py-2">
                    Repositorio institucional
                </div>
                <iframe 
                    title="Repositorio institucional"
                    width="100%"
                    height="100%"
                    src="http://bibliotecadigital.udea.edu.co/" 
                />
            </IonContent>
        </IonPage>
    )
}