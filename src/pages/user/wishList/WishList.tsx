import React from 'react'
import { 
  trashOutline
 } from 'ionicons/icons';
import { IonPage, IonContent, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { ProgressBar, Modal } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import MaterialCard from './../../../components/lobby/MaterialCard'
import ProviderServices from './../../../providerServices/index'

import HOSTS from './../../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class WishList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      wishList: [],
      isLoading: false,
      needUpdate: false,
      errorMessage: '',
      deleteProcess: 0,
      currentItem: null
    }
  }

  componentDidMount(){
    this.getWishList()
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevState.needUpdate !== this.state.needUpdate && this.state.needUpdate) {
      this.getWishList()
    }
  }

  render() {
    let loadingTemplate
    if (this.state.isLoading) {
      loadingTemplate = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
    }
    return (
      <IonPage>
        <HeaderBiblioapp />
        {loadingTemplate}
        <IonContent>
          <div className="custom-bg-fluorescent-green text-light text-center py-2">
            Mi lista de deseos
          </div>
          {
            this.state.wishList.length?
            (
              this.state.wishList.map((item:any, index:any) => {
                return (
                  <div key={index} className="position-relative"> 
                    <MaterialCard 
                      title={item.titulo} 
                      image={item.image_url} 
                      autores={item.autores} 
                      isbn={item.isbn}
                      count={item.ejemplares}
                      description={item.padre}
                      titleno={item.titleno}
                    />
                    <IonButton 
                      className="position-absolute"
                      style={{
                        bottom: '0',
                        right: '1em'
                      }}
                      color="danger"
                      onClick={() => { this.setState({deleteProcess: 1, currentItem: item.titleno }) }} 
                    >
                      <IonIcon size="small" icon={trashOutline} />
                    </IonButton>
                  </div>
                )
              })
            ):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }
          <Modal show={this.state.deleteProcess == 1} onHide={() => { this.setState({deleteProcess: 0}) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                BiblioApp
              </Modal.Title>
            </Modal.Header>
            <div className="pt-2 pb-4 px-3">
              <div className="d-flex justify-content-center">
                <span>¿Esta seguro que desea eliminar el elemento de su lista de deseos?</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => {this.setState({deleteProcess: 0})}}>
                  Cancelar
                </IonButton>
                <IonButton color="danger" onClick={() => {this.deleteWishListItem(this.state.currentItem)}}>Eliminar</IonButton>
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
                <span>Ha eliminado con éxito.</span>
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
                <span>No se pudo eliminar el item de su lista de deseos.</span>
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

  deleteWishListItem = (titleno:any) => {
    this.setState({
      isLoading: true,
      needUpdate: false,
      deleteProcess: 0
    })
    services.deleteWishListItem(titleno).then(res => {
      this.setState({
        isLoading: false,
        needUpdate: true,
        deleteProcess: 2
      })
    }).catch(err => {
      this.setState({
        isLoading: false,
        needUpdate: false,
        deleteProcess: -1
      })
      console.log(err);
    })
  }

  getWishList = () => {
    this.setState({
      wishList: [],
      isLoading: true,
      needUpdate: false,
      errorMessage: ""
    })
    services.getWishList().then(res => {
      this.setState({
        wishList: res,
        isLoading: false,
        needUpdate: false,
        errorMessage: ""
      })
    }).catch(err => {
      this.setState({
        wishList: [],
        isLoading: false,
        needUpdate: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }
}