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

export default () => {
  //const location = useLocation();
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
  }, [showCorrectAlert/*, location*/])

  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonTitle className="custom-text-green">Mis reservas</IonTitle>
          </IonListHeader>
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
        <IonAlert
          isOpen={showConfirmAlert}
          onDidDismiss={() => setShowConfirmAlert(false)}
          header={'BiblioApp'}
          message={'¿Esta seguro que desea cancelar la reserva?'}
          buttons={[
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Si',
              handler: () => {
                cancelReservation(reserveToCancel).then((res:any) => {
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
          message={'Ha cancelado su reserva con éxito.'}
          buttons={[
            {
              text: 'Cerrar',
              handler: () => {
                refreshReservations()
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