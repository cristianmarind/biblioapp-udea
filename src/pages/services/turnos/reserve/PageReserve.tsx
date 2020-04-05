import React, { useState } from 'react'
import { isArray } from 'util';
import {
  IonPage,
  IonContent,
  IonList,
  IonRadioGroup,
  IonButton,
  IonLabel,
  IonItem,
  IonRadio,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonAlert
} from '@ionic/react';
import sala from './../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/salas.png'
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from './../../../../providerServices/index'
import './PageReserve.css'

let providerServices = new ProviderServices('http://localhost/turnos/services')

function reserve(pcSelected:any, filter:any) {
  return new Promise((resolve, reject) => {
    if (!pcSelected) {
      reject({
        message: 'Debe seleccionar un equipo.'
      })
    }
    providerServices
      .postModel("/CrearReserva.php", {
        codigoSala: pcSelected.codSala,
        codigoComputador: pcSelected.codComputador,
        horasReserva: filter.horasReserva,
        usuario: localStorage.getItem('username')
      })
      .then((res:any) => {
        if(res.data.banderaReservaCreada === false){
          reject({
            message: res.data.resultadoCrearReserva
          })
          return 
        }
        resolve({
          message: 'Ha reservado con éxito el equipo.'
        })
        /*this.$router.push({
          path: '/myReservations'
        })*/
      }).catch(() => {
        reject({
          message: 'No se pudo reservar con exito, intente mas tarde.'
        })
      })
  })
}

export default (props: any) => {
  const [pc, setPc] = useState<any>();
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showCorrectAlert, setShowCorrectAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let pcs = []
  let filter = {}
  if (props.location.state) {
    if (isArray(props.location.state.pcs)) {
      pcs = props.location.state.pcs
    }
    if (props.location.state.filter) {
      filter = props.location.state.filter
    }
  }

  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        <div className="pt-2 px-3">
          <IonLabel>Resultados de busqueda</IonLabel>
        </div>
        <div className="result px-3">
          <IonList>
            <IonRadioGroup onIonChange={e => setPc(e.detail.value)}>
              {
                pcs.map((item: any, index: any) => {
                  return (
                    <IonItem key={index}>
                      <IonLabel>{item.nombrePc}</IonLabel>
                      <IonRadio slot="start" value={item} />
                    </IonItem>
                  )
                })
              }
            </IonRadioGroup>
          </IonList>
        </div>
        <IonButton 
          onClick={() => {
              if (!pc) {
                setErrorMessage('Debe seleccionar un equipo.')
                return setShowErrorAlert(true)
              }
              setShowConfirmAlert(true)
            }
          }
          color="success" 
          expand="block"
        >
          Reservar computadora
        </IonButton>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Mapa de la sala</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonImg src={sala} />
          </IonCardContent>
        </IonCard>
        <IonAlert
          isOpen={showConfirmAlert}
          onDidDismiss={() => setShowConfirmAlert(false)}
          header={'BiblioApp'}
          message={'¿Esta seguro que desea reservar el equipo?'}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Reservar',
              handler: () => {
                reserve(pc, filter).then(res => {
                  setShowCorrectAlert(true)
                }).catch(err => {
                  setErrorMessage(err.message)
                  setShowErrorAlert(true)
                })
              }
            }
          ]}
        />
        <IonAlert
          isOpen={showCorrectAlert}
          onDidDismiss={() => setShowCorrectAlert(false)}
          header={'BiblioApp'}
          message={'Ha reservado el equipo con exito.'}
          buttons={[
            {
              text: 'Cerrar',
              handler: () => {
                props.history.push('/turnos/myreservations')
              }
            }
          ]}
        />
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header={'BiblioApp'}
          message={errorMessage}
          buttons={[
            {
              text: 'Cerrar'
            }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}