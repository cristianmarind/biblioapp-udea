import React from 'react'
import { 
  trashOutline
 } from 'ionicons/icons';
import { IonPage, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonIcon, IonAlert } from '@ionic/react';
import { ProgressBar, Modal } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from './../../../providerServices/index'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';

import HOSTS from './../../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class MyReservations extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      myReservations: [],
      isLoading: false,
      errorMessage: "",
      deleteProcess: 0,
      currentItem: null
    }
  }

  componentWillReceiveProps(nextProps:any){
    if (nextProps.location.pathname == '/account/myReservations') {
      this.getMyReservations()
    }
  }

  render() {
    let loadingTemplate
    if (this.state.isLoading) {
      loadingTemplate = <ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />
    }
    return (
      <IonPage>
        <HeaderBiblioapp history={this.props.history} />
        {loadingTemplate}
        <IonContent>
          {
            this.state.myReservations.length?
            (this.state.myReservations.map((item: any, index: any) => {
              return (
                <div key={index} className="position-relative">
                  <IonCard className="border custom-border-color-green pb-4">
                    <IonCardHeader>
                      <IonCardTitle className="custom-text-green font-weight-bold">
                        <TextMaxSize sizeDefault="45" text={item.titulo} />
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="4">
                            <img src={item.image_url || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
                          </IonCol>
                          <IonCol size="8">
                            <IonText>
                              {
                                item.estado?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Estado: </span>
                                  <TextMaxSize sizeDefault="80" text={item.estado} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.fecha_reserva?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Fecha de reserva: </span>
                                  <TextMaxSize sizeDefault="80" text={item.fecha_reserva} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.fecha_recoger?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Fecha a recoger: </span>
                                  <TextMaxSize sizeDefault="80" text={item.fecha_recoger} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.observaciones?
                                (<div>
                                  <TextMaxSize sizeDefault="80" text={item.observaciones} labelVisible={false} />
                                </div>):null
                              }
                              
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                  <IonButton 
                    className="position-absolute"
                    style={{
                      bottom: '0',
                      right: '1em'
                    }}
                    color="danger"
                    onClick={() => { this.setState({deleteProcess: 1, currentItem: item.reserva }) } } 
                  >
                    <IonIcon size="small" icon={trashOutline} />
                  </IonButton>
                </div>
              )
            })):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }
          <Modal show={this.state.deleteProcess == 1} onHide={() => { this.setState({deleteProcess: 0}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>¿Esta seguro que desea eliminar su reserva?</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => {this.setState({deleteProcess: 0})}}>
                  Cancelar
                </IonButton>
                <IonButton color="danger" onClick={() => {this.deleteReservation(this.state.currentItem)}}>Eliminar</IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.deleteProcess == 2} onHide={() => { this.setState({deleteProcess: 0}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>Se ha eliminado su reserva exitosamente.</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => {this.setState({deleteProcess: 0})}}>
                  Cerrar
                </IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.deleteProcess == -1} onHide={() => { this.setState({deleteProcess: 0}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>No se pudo eliminar su reserva.</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => {this.setState({deleteProcess: 0})}}>
                  Cerrar
                </IonButton>
              </div>
            </div>
          </Modal>
        </IonContent>
      </IonPage>
    )
  }

  getMyReservations(){
    this.setState({
      myReservations: [],
      isLoading: true,
      errorMessage: ""
    })
    services.getMyReservations().then(res => {
      this.setState({
        myReservations: res,
        isLoading: false,
        errorMessage: ""
      })
    }).catch(err => {
      this.setState({
        myReservations: [],
        isLoading: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }

  deleteReservation(titleno:any){
    this.setState({
      isLoading: true
    })
    services.removeReserve(titleno).then(res => {
      this.setState({
        isLoading: false,
        deleteProcess: 2
      })
      this.getMyReservations()
    }).catch(err => {
      this.setState({
        isLoading: false,
        deleteProcess: -1
      })
      console.log(err);
    })
  }
}