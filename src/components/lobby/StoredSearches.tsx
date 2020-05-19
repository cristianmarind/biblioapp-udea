import React, { useState } from 'react'
import { IonList, IonItem, IonLabel, IonButtons, IonIcon } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import { 
  trashOutline
 } from 'ionicons/icons';
import ProviderServices from './../../providerServices/index'

let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')


export default class StoredSearches extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      storedSearches: [],
      isLoading: false,
      needUpdate: false
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
      loading = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
    }
    return (
      <div style={{
        height: '60vh',
        overflowY: 'auto'
      }}>
        {loading}
        <p className="px-3 pt-2 mb-0">Selecciona la búsqueda que quieres restablecer:</p>
        <IonList>
          {
            this.state.storedSearches.map((item:any, index:any) => {
              return (
                <IonItem key={index}>
                  <IonLabel onClick={() => { this.props.search(item.busquedaAlmacenada) }}>{item.busquedaAlmacenada}</IonLabel>
                  <IonButtons onClick={() => { this.removeQuery(item.idBusqueda) }}>
                    <IonIcon className="text-danger" icon={trashOutline} />
                  </IonButtons>
                </IonItem>
              )
            })
          }
        </IonList>
      </div>
    )
  }

  getStoredSearches = () => {
    this.setState({
      storedSearches: [],
      isLoading: true,
      needUpdate: false
    })
    services.searchesByUser().then(res => {
      this.setState({
        isLoading: false,
        storedSearches: res,
        needUpdate: false
      })
    }).catch(err => {
      this.setState({
        storedSearches: [],
        isLoading: false,
        needUpdate: false
      })
      console.log(err);
    })
  }

  removeQuery = (idQuery:any) => {
    this.setState({
      isLoading: true,
      needUpdate: false
    })
    services.EliminarBusquedaPorUsuario(idQuery).then(res => {
      this.setState({
        isLoading: false,
        needUpdate: true
      })
    }).catch(err => {
      this.setState({
        isLoading: false,
        needUpdate: false
      })
      console.log(err);
    })
  }

}