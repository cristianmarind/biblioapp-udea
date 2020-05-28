import React, { useState } from 'react'
import { IonList, IonItem, IonLabel, IonButtons, IonIcon, IonAlert, IonButton } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import { 
  trashOutline
 } from 'ionicons/icons';

import HOSTS from './../../providerServices/hosts.js'
import ProviderServices from './../../providerServices/index'

let services = new ProviderServices(HOSTS.CIRENE.HOST)


export default class StoredSearches extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      storedSearches: [],
      isLoading: false,
      needUpdate: false,
      deleteProcess: 0,
      currentItem: null
    }
  }

  componentDidMount(){
    this.getStoredSearches()
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevState.needUpdate !== this.state.needUpdate && this.state.needUpdate) {
      this.getStoredSearches()
    }
  }

  render(){
    let loading
    if (this.state.isLoading) {
      loading = <ProgressBar style={{"height": ".7em"}} animated now={100} variant="success" />
    }
    return (
      <div style={{
        height: '60vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <p className="px-3 pt-2 mb-0">Selecciona la búsqueda que quieres restablecer:</p>
        <IonList>
          {
            this.state.storedSearches.map((item:any, index:any) => {
              return (
                <IonItem key={index}>
                  <IonLabel onClick={() => { this.props.search(item.busquedaAlmacenada) }}>{item.busquedaAlmacenada}</IonLabel>
                  <IonButtons onClick={() => { this.setState({deleteProcess: 1, currentItem: item.idBusqueda })}}>
                    <IonIcon className="text-danger" icon={trashOutline} />
                  </IonButtons>
                </IonItem>
              )
            })
          }
        </IonList>
        <div style={{
          position: 'absolute',
          left: '0',
          right: '0',
          bottom: '0'
        }}>
          {loading}
        </div>
        <div style={{
          zIndex: 100
        }}>
          {
            this.state.deleteProcess == 1?
            (<div>
              <div className="d-flex justify-content-center">
                <span>¿Esta seguro que desea eliminar su busqueda?</span>
              </div>
              <div className="d-flex justify-content-center">
                <IonButton onClick={() => {this.setState({deleteProcess: 0})}}>
                  Cancelar
                </IonButton>
                <IonButton onClick={() => {this.removeQuery(this.state.currentItem)}}>Eliminar</IonButton>
              </div>
            </div>):null
          }
          {
            this.state.deleteProcess == 2?
            (<div>
              <div>
                <span>Ha eliminado con exito</span>
              </div>
            </div>):null
          }
          {
            this.state.deleteProcess == -1?
            (<div>
              <div>
                <span>No se pudo eliminar su busqueda</span>
              </div>
            </div>):null
          }
        </div>
      </div>
    )
  }

  getStoredSearches = () => {
    this.setState({
      storedSearches: [],
      isLoading: true,
      needUpdate: false,
      deleteProcess: 0
    })
    services.searchesByUser().then(res => {
      this.setState({
        isLoading: false,
        storedSearches: res,
        needUpdate: false,
        deleteProcess: 0
      })
    }).catch(err => {
      this.setState({
        storedSearches: [],
        isLoading: false,
        needUpdate: false,
        deleteProcess: 0
      })
      console.log(err);
    })
  }

  removeQuery = (idQuery:any) => {
    this.setState({
      isLoading: true,
      needUpdate: false,
      deleteProcess: 0
    })
    services.EliminarBusquedaPorUsuario(idQuery).then(res => {
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

}