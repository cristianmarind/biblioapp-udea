import React, { useState } from 'react'
import { isArray } from 'util';
import { Modal, ProgressBar } from 'react-bootstrap';
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
  IonImg
} from '@ionic/react';
import sala from './../../../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/salas.png'
import HeaderBiblioapp from '../../../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from '../../../../../../providerServices/index'
import './PageReserve.css'

import HOSTS from '../../../../../../providerServices/hosts.js'
let providerServices = new ProviderServices(HOSTS.TURNOS.HOST)

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
  const [isLoading, setIsLoading] = useState(false);

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
      <HeaderBiblioapp history={props.history} />
      {
        isLoading?
        (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />):null
      }
      <IonContent>
        <div className="pt-2 px-3">
          <IonLabel>Resultados de busqueda</IonLabel>
        </div>
        <div className="result px-3">
          <IonList>
            <IonRadioGroup onIonChange={e => setPc(e.detail.value)}>
              {/*
                pcs = [
                  {
                    nombrePc: 'PC 001'//Index = 0
                  }
                ]*/
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
        
        <Modal show={showConfirmAlert} onHide={() => { setShowConfirmAlert(false) }}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              BiblioApp
            </Modal.Title>
          </Modal.Header>
          <div className="pt-2 pb-4 px-3">
            <div className="d-flex justify-content-center">
              <span>¿Esta seguro que desea reservar el equipo?</span>
            </div>
            <div className="d-flex justify-content-center">
              <IonButton onClick={() => {setShowConfirmAlert(false)}}>
                Cancelar
              </IonButton>
              <IonButton color="success" onClick={() => {
                setIsLoading(true)
                reserve(pc, filter).then(res => {
                  setIsLoading(false)
                  setShowConfirmAlert(false)
                  setShowCorrectAlert(true)
                }).catch(err => {
                  setIsLoading(false)
                  setShowConfirmAlert(false)
                  setErrorMessage(err.message)
                  setShowErrorAlert(true)
                })
              }}>Reservar</IonButton>
            </div>
          </div>
        </Modal>
        <Modal show={showCorrectAlert} onHide={() => { setShowCorrectAlert(false) }}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              BiblioApp
            </Modal.Title>
          </Modal.Header>
          <div className="pt-2 pb-4 px-3">
            <div className="d-flex justify-content-center">
              <span>Ha reservado el equipo con exito.</span>
            </div>
            <div className="d-flex justify-content-center">
              <IonButton 
                onClick={() => {
                  setShowCorrectAlert(false)
                  props.history.push({
                    pathname: '/turnos/myreservations',
                    state: { refresh: true }
                })}}
              >
                Cerrar
              </IonButton>
            </div>
          </div>
        </Modal>

        <Modal show={showErrorAlert} onHide={() => { setShowErrorAlert(false) }}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              BiblioApp
            </Modal.Title>
          </Modal.Header>
          <div className="pt-2 pb-4 px-3">
            <div className="d-flex justify-content-center">
              <span>{errorMessage}</span>
            </div>
            <div className="d-flex justify-content-center">
              <IonButton onClick={() => {setShowErrorAlert(false)}}>
              Cerrar
              </IonButton>
            </div>
          </div>
        </Modal>
      </IonContent>
    </IonPage>
  )
}
