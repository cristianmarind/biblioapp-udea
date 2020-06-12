import React, { useState, useEffect } from 'react'
//import { useLocation } from 'react-router-dom';
import { 
  IonPage, 
  IonContent,
  IonList,
  IonListHeader,
  IonTitle,
  IonAlert,
  IonCard,
  IonItem,
  IonLabel,
  IonBadge,
  IonButton
} from '@ionic/react';
import { Modal, ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import HOSTS from './../../../../providerServices/hosts.js'
import ProviderServices from './../../../../providerServices/index'

let providerServices = new ProviderServices(HOSTS.TURNOS.HOST)

function refreshReservations(){
  return new Promise((resolve, reject) => {
    providerServices.getModel(`/ListarReservasPorUsuarioAPP.php?usuarioConsulta=${localStorage.getItem('username')}`).then(res => {
      resolve({
        data: Array.isArray(res.data)?res.data:[]
      })
    }).catch((err) => {
      console.log(err);
      
      reject({
        message: 'El problema es nuestro, intenta mas tarde.'
      })
    })
  })
}
function cancelReservation(code:any){
  return new Promise((resolve, reject) => {
    providerServices
    .getModel(`/CancelarReserva.php?codigoReserva=${code}`)
    .then(res => {
      if(res.data.resultadoCancelarReserva === false){
        return reject({
          message: 'No se pudo cancelar la reserva con éxito.'
        })
      }
      return resolve()
    }).catch(err => {
      return reject({
        message: 'El problema es nuestro, intenta mas tarde.'
      })
    })
  })
}

export default (props: any) => {
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showCorrectAlert, setShowCorrectAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reserves, setReserves] = useState([]);
  const [reserveToCancel, setReserveToCancel] = useState('');

  useEffect(() => {
    refreshReservations().then((res:any) => {
      setReserves(res.data)
    }).catch(err => {
      setErrorMessage(err.message)
      setShowErrorAlert(true)
    })
  }, [showCorrectAlert, props.location.state])

  return (
    <IonPage>
      <HeaderBiblioapp history={props.history} />
      <IonContent>
        <IonList>
          {
            reserves.length > 0?
            (reserves.map((item:any, index:any) => {
              return (
                <IonCard key={index}>
                  <IonItem>
                    <IonLabel>Biblioteca:</IonLabel>
                    <IonBadge color="light" slot="end">{item.nombreBiblioteca}</IonBadge>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Sala:</IonLabel>
                    <IonBadge color="light" slot="end">{item.nombreSala}</IonBadge>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Fecha inicial:</IonLabel>
                    <IonBadge color="light" slot="end">{item.fechaInicio}</IonBadge>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Fecha final:</IonLabel>
                    <IonBadge color="light" slot="end">{item.fechaFin}</IonBadge>
                  </IonItem>
                  <IonItem>
                    <IonButton 
                      color="danger"
                      onClick={
                        e => {
                          setReserveToCancel(item.codReserva)
                          setShowConfirmAlert(true)
                        }
                      }
                    >
                      Cancelar reserva
                    </IonButton>
                  </IonItem>
                </IonCard>
              )
            })):<div className="text-center pt-3">No tienes reservas actualmente</div>
          }
        </IonList>
        <Modal show={showConfirmAlert} onHide={() => { setShowConfirmAlert(false) }}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              BiblioApp
            </Modal.Title>
          </Modal.Header>
          <div className="pt-2 pb-4 px-3">
            <div className="d-flex justify-content-center">
              <span>¿Esta seguro que desea cancelar la reserva?</span>
            </div>
            <div className="d-flex justify-content-center">
              <IonButton onClick={() => {setShowConfirmAlert(false)}}>
                No
              </IonButton>
              <IonButton color="success" onClick={() => {
                cancelReservation(reserveToCancel).then((res:any) => {
                  setShowConfirmAlert(false)
                  setShowCorrectAlert(true)
                }).catch(err => {
                  setShowConfirmAlert(false)
                  setErrorMessage(err.message)
                  setShowErrorAlert(true)
                })
              }}>Cancelar la reserva</IonButton>
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
              <span>Ha cancelado su reserva con éxito.</span>
            </div>
            <div className="d-flex justify-content-center">
              <IonButton 
                onClick={() => {
                  setShowCorrectAlert(false)
                  refreshReservations()
                }}
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