import React from 'react'
import {
  IonPage,
  IonContent,
  IonTitle,
  IonLabel,
  IonList,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonButton,
  IonAlert,
} from '@ionic/react';
import HeaderBiblioapp from '../../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import SearchFilter from './../../../../../components/turnos/searchFilter/SearchFilter'
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
      messageAlert: ''
    };
  }

  applyFilter = async (filterObject: any) => {
    let providerServices = new ProviderServices('https://cors-anywhere.herokuapp.com/http://biblioteca.udea.edu.co/turnos/services')
    let filter = filterObject.filter
    let pcs: any = []
    this.setState({filter: filterObject})
    if (!this.props.location.state) {
      return
    }
    await providerServices.postModel(`/ListarEquiposDisponiblesEnSalaPorHora.php?horaConsulta=${filter.hour}&idSala=${this.props.location.state.roomId}`).then(res => {
      pcs = res.data
    }).catch((err) => {
      console.log(err);
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
        console.log(err);
      })
    }
    this.setState({
      pcs
    })
  }

  reserve(pcSelected:any, filter:any) {
    let providerServices = new ProviderServices('https://cors-anywhere.herokuapp.com/http://biblioteca.udea.edu.co/turnos/services')
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

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp />
        <IonContent>
          <IonTitle className="pt-3">{this.props.location.state?this.props.location.state.currentLocation:null}</IonTitle>
          <SearchFilter applyFilter={this.applyFilter} />
          <div className="pt-2 px-3">
            <IonLabel>Resultados de busqueda</IonLabel>
          </div>
          <div className="result px-3">
            <IonList>
              <IonRadioGroup onIonChange={e => this.setState({selectedPc: e.detail.value})}>
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
            this.state.pcs.length > 0?
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
            </IonButton>):(<div className="text-center">No hay equipos disponibles en el horario requerido.</div>)
          }
          {
            this.state.controllerProcess
          }
          <IonAlert
          isOpen={this.state.isReserve}
          onDidDismiss={() => this.setState({isReserve: false})}
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
                this.reserve(this.state.selectedPc, this.state.filter).then(() => {
                  this.setState({
                    isReserve: false,
                    isCorrect: true,
                    isError: false,
                    messageAlert: ''
                  })
                }).catch(err => {
                  this.setState({
                    isReserve: false,
                    isCorrect: false,
                    isError: true,
                    messageAlert: err.message
                  })
                })
              }
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.isCorrect}
          onDidDismiss={() => this.setState({isCorrect: false})}
          header={'BiblioApp'}
          message={'Ha reservado el equipo con exito.'}
          buttons={[
            {
              text: 'Cerrar',
              handler: () => {
                this.props.history.push('/turnos/myreservations')
              }
            }
          ]}
        />
        <IonAlert
          isOpen={this.state.isError}
          onDidDismiss={() => this.setState({isError: false})}
          header={'BiblioApp'}
          message={this.state.messageAlert}
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
}