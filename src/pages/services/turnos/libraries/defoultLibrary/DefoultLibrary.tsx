import React from 'react'
import {
  IonPage,
  IonContent,
  IonLabel,
  IonList,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonButton,
} from '@ionic/react';
import { Modal, ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import SearchFilter from './../../../../../components/turnos/searchFilter/SearchFilter'
import HOSTS from './../../../../../providerServices/hosts.js'
import ProviderServices from './../../../../../providerServices/index'


export default class PageCarlosGaviria extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      pcs: [],
      filter: {},
      selectedPc: null,
      isReserve: false,
      isError: false,
      isCorrect: false,
      messageAlert: '',
      isLoading: false
    };
  }

  applyFilter = async (filterObject: any) => {
    let providerServices = new ProviderServices(HOSTS.TURNOS.HOST)
    let filter = filterObject.filter
    let pcs: any = []
    this.setState({ filter: filterObject })
    if (!this.props.location.state) {
      return
    }
    this.setState({
      isLoading: true
    })
    await providerServices.postModel(`/ListarEquiposDisponiblesEnSalaPorHora.php?horaConsulta=${filter.hour}&idSala=${this.props.location.state.roomId}`).then(res => {
      pcs = res.data
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false
      })
    })
    if (filter.nroHours === 2) {
      await providerServices.postModel(`/ListarEquiposDisponiblesEnSalaPorHora.php?horaConsulta=${filter.hour + 1}&idSala=${this.props.location.state.roomId}`).then(res => {
        let resArray = []
        for (const filter1 of pcs) {
          for (const filter2 of res.data) {
            if (filter1.codComputador === filter2.codComputador) {
              resArray.push(filter1)
              break;
            }
          }
        }
        pcs = resArray
      }).catch((err) => {
        console.log(err)
        this.setState({
          isLoading: false
        })
      })
    }
    this.setState({
      pcs,
      isLoading: false
    })
  }

  reserve(pcSelected: any, filter: any) {
    let providerServices = new ProviderServices(HOSTS.TURNOS.HOST)
    return new Promise((resolve, reject) => {
      if (!pcSelected) {
        reject({
          message: 'Debe seleccionar un equipo.'
        })
      }
      let params = {
        codigoSala: pcSelected.codSala,
        codigoComputador: pcSelected.codComputador,
        horasReserva: filter.horasReserva,
        usuario: localStorage.getItem('username')
      }
      providerServices
        .postModel("/CrearReserva.php", params)
        .then((res: any) => {
          if (res.data.banderaReservaCreada === false) {
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

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp history={this.props.history} />
        {
          this.state.isLoading?
          (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />):null
        }
        <IonContent>
          <div className="pt-1 pl-3">
            <span className="pt-3 font-weight-bold">{this.props.location.state ? this.props.location.state.currentLocation : null}</span>
          </div>
          <SearchFilter applyFilter={this.applyFilter} />
          <div className="pt-2 px-3">
            <IonLabel>Resultados de busqueda</IonLabel>
          </div>
          <div className="result px-3">
            <IonList>
              <IonRadioGroup onIonChange={e => this.setState({ selectedPc: e.detail.value })}>
                {
                  this.state.pcs.map((item: any, index: any) => {
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
          {
            this.state.pcs.length > 0 ?
              (<IonButton
                onClick={() => {
                  if (!this.state.selectedPc) {
                    this.setState({
                      isReserve: false,
                      isCorrect: false,
                      isError: true,
                      messageAlert: 'Debe seleccionar un equipo.'
                    })
                    return
                  }
                  this.setState({
                    isReserve: true,
                    isCorrect: false,
                    isError: false,
                    messageAlert: ''
                  })
                }
                }
                color="success"
                expand="block"
              >
                Reservar computadora
              </IonButton>) : (<div className="text-center">{!this.state.isLoading?'No hay equipos disponibles en el horario requerido.':null}</div>)
          }
          {
            this.state.controllerProcess
          }
          <Modal show={this.state.isReserve} onHide={() => { this.setState({ isReserve: false }) }}>
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
                <IonButton onClick={() => { this.setState({ isReserve: false }) }}>
                  Cancelar
                </IonButton>
                <IonButton color="success" onClick={() => {
                  this.setState({
                    isLoading: true
                  })
                  this.reserve(this.state.selectedPc, this.state.filter).then(() => {
                    this.setState({ isReserve: false })
                    this.setState({
                      isReserve: false,
                      isCorrect: true,
                      isError: false,
                      messageAlert: '',
                      isLoading: false
                    })
                  }).catch(err => {
                    this.setState({ isReserve: false })
                    this.setState({
                      isReserve: false,
                      isCorrect: false,
                      isError: true,
                      messageAlert: err.message,
                      isLoading: false
                    })
                  })
                }}>Reservar</IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.isCorrect} onHide={() => { this.setState({ isCorrect: false }) }}>
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
                    this.setState({ isCorrect: false })
                    this.props.history.push({
                      pathname: '/turnos/myreservations',
                      state: { refresh: true }
                    })
                  }}
                >
                  Cerrar
                </IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.isError} onHide={() => { this.setState({ isError: false }) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
            </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>{this.state.messageAlert}</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => { this.setState({ isError: false }) }}>
                  Cerrar
              </IonButton>
              </div>
            </div>
          </Modal>
        </IonContent>
      </IonPage>
    )
  }
}