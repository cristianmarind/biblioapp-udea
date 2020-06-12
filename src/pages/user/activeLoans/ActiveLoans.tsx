import React from 'react'
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonIcon, IonButton } from '@ionic/react';
import { Modal, ProgressBar } from 'react-bootstrap';
import { 
  repeatOutline
} from 'ionicons/icons';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from './../../../providerServices/index'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';

import HOSTS from './../../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class ActiveLoans extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      activeLoans: [],
      isLoading: false,
      errorMessage: '',
      openModal: 0,
      currentBarcode: ''
    }
  }

  componentWillReceiveProps(nextProps:any){
    if (nextProps.location.pathname == '/account/activeLoans') {
      this.getActiveLoans()
    }
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
          {
            this.state.activeLoans.length?
            (this.state.activeLoans.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <IonCard className="border custom-border-color-green">
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
                              <div>
                                <span className="custom-text-green font-weight-bold">Signatura: </span>
                                <TextMaxSize sizeDefault="80" text={item.signatura} labelVisible={false} />
                              </div>
                              <div>
                                <span className="custom-text-green font-weight-bold">Fecha de préstamo: </span><br />
                                <TextMaxSize sizeDefault="80" text={item.fecha_prestamo} labelVisible={false} />
                              </div>
                              <div>
                                <span className="custom-text-green font-weight-bold">Fecha de devolución: </span><br />
                                <TextMaxSize sizeDefault="80" text={item.fecha_devolucion} labelVisible={false} />
                              </div>
                              <div 
                                className="custom-text-green d-flex align-items-center mt-2"
                                onClick={() => {
                                  this.setState({ openModal: 1, currentBarcode: item.barcode })
                                }}
                              >
                                <IonIcon icon={repeatOutline} size="large" />
                                <span>Renovar préstamo</span>
                              </div>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </div>
              )
            })):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }
        </IonContent>

        <Modal show={this.state.openModal == 1} onHide={() => { this.setState({openModal: 0, currentBarcode: ''}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>¿Esta seguro que desea renovar préstamo?</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => { this.setState({ openModal: 0, currentBarcode: '' }) }}>
                  Cancelar
                </IonButton>
                <IonButton color="success" onClick={() => {
                  this.renewLoan(this.state.currentBarcode)
                }}>Renovar préstamo</IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.openModal == 2} onHide={() => { this.setState({openModal: 0, currentBarcode: ''}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>Ha renovar el préstamo con exito.</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton
                  onClick={() => {
                    this.setState({ openModal: 0, currentBarcode: '' })
                    this.getActiveLoans()
                  }}
                >
                  Cerrar
                </IonButton>
              </div>
            </div>
          </Modal>
          <Modal show={this.state.openModal == -1} onHide={() => { this.setState({openModal: 0, currentBarcode: ''}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
            </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>{this.state.errorMessage}</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => { this.setState({openModal: 0, currentBarcode: '', errorMessage: ''}) }}>
                  Cerrar
              </IonButton>
              </div>
            </div>
          </Modal>
      </IonPage>
    )
  }

  renewLoan = (barcode:any) => {
    this.setState({
      isLoading: true,
      errorMessage: ""
    })
    services.renewLoan(barcode).then(() => {
      this.setState({openModal: 2, currentBarcode: '', isLoading: false})
    }).catch(err => {
      console.log(err);
      this.setState({openModal: -1, currentBarcode: '', errorMessage: err.msg, isLoading: false})
    })
  }

  getActiveLoans = () => {
    this.setState({
      activeLoans: [],
      isLoading: true,
      errorMessage: ""
    })
    services.getActiveLoans().then((res:any) => {
      this.setState({
        activeLoans: res,
        isLoading: false,
        errorMessage: ""
      })
    }).catch((err:any) => {
      this.setState({
        ActiveLoans: [],
        isLoading: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }
}