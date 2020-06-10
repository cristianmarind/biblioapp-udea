import React, { useState, useEffect } from 'react'
import { Modal, ProgressBar } from 'react-bootstrap';
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonInput,
  IonButton,
} from '@ionic/react';
import { 
  searchSharp, 
  saveSharp, 
  list,
 } from 'ionicons/icons';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import MaterialCard from './../../components/lobby/MaterialCard'
import ProviderServices from './../../providerServices/index'
import LogginLink from './../../components/general/logginLink/LogginLink'
import Recommendations from './../../components/lobby/Recommendations'
import StoredSearches from './../../components/lobby/StoredSearches'

import HOSTS from './../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)


export default (props:any) => {
  const [saveQueryVisibility, setSaveQueryVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResult, setIsResult] = useState(false)
  const [visibilityStoredSearches, setVisibilityStoredSearches] = useState(false)
  const [visibilitySearchStored, setVisibilitySearchStored] = useState(false)
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<any>([])
  const handleCloseStoredSearches = () => setVisibilityStoredSearches(false);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setSaveQueryVisibility(false)
    setIsLoading(false)
    setIsResult(false)
    setVisibilityStoredSearches(false)
    setVisibilitySearchStored(false)
    setQuery('')
    setRes([])
    setErrorMessage('')
  }, [props.location.state])

  const search = (q?:any) => {
    let queryParam = q?q:query
    if (!queryParam.trim()) {
      return
    }
    setRes([])
    setIsLoading(true)
    services.searchMaterial(queryParam).then(res => {
      setErrorMessage('')
      setIsResult(true)
      setRes(res)
      setIsLoading(false)
      setSaveQueryVisibility(true)
    }).catch(err => {
      setErrorMessage(err.msg)
      setIsLoading(false)
      setIsResult(true)
      console.log(err);
    })
  }

  const saveQuery = () => {
    setIsLoading(true)
    services.GuardarBusquedaPorUsuario(localStorage.getItem('userId'), query).then(res => {
      setIsLoading(false)
      setVisibilitySearchStored(true)
    }).catch(err => {
      setIsLoading(false)
      console.log(err);
    })
  }
  const selectOldSearch = (oldSearch:any) => {
    setQuery(oldSearch)
    handleCloseStoredSearches()
    search(oldSearch)
  }


  let loading, 
  saveQueryButton
  if (isLoading) {
    loading = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
  }


  let lobby
  if (!isResult) {
    if (localStorage.getItem('isLogged')) {
      lobby = (
        <div className="mt-3">
          <Recommendations />
        </div>
      )
    } else {
      lobby = (
        <div className="mt-5 pt-5 d-flex justify-content-center">
          <LogginLink />
        </div>
      )
    }
    
  }

  return (
    <IonPage>
      <HeaderBiblioapp history={props.history} />
      { loading }
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <IonIcon slot="start" icon={searchSharp} />
            </IonLabel>
            <IonInput 
              placeholder="Titulo, autor, materia"
              value={query}
              onIonChange={(e:any)=>{
                setQuery(e.detail.value)
              }}
              onKeyPress={e => {
                if(e.key === 'Enter'){
                  search()
                }
              }}
            />
            <IonButton onClick={() => { search() }}>Buscar</IonButton>
          </IonItem>
          { 
            saveQueryVisibility && localStorage.getItem('userId')?
            (<IonItem onClick={() => { saveQuery() }}>
              <IonIcon size="small" slot="start" icon={saveSharp} />
              <IonLabel>Guardar búsqueda</IonLabel>
            </IonItem>):null
          }
          {
            localStorage.getItem('userId')?
            (<IonItem onClick={() => { setVisibilityStoredSearches(true) }}>
              <IonIcon size="small" slot="start" icon={list} />
              <IonLabel>Ver búsquedas almacenadas</IonLabel>
            </IonItem>):null
          }
          {lobby}
          <div className="mt-3"></div>
          {
            res.length === 0 && isResult?(<div className="text-center">{errorMessage}</div>):null
          }
          {
            res.map((item:any, index:any) => {
              return (
                  <MaterialCard 
                    key={index}
                    title={item.titulo} 
                    image={item.image_url} 
                    autores={item.autores} 
                    isbn={item.isbn}
                    count={item.ejemplares}
                    description={item.padre}
                    titleno={item.titleno}
                  />
              )
            })
          }
        </IonList>
        <Modal show={visibilityStoredSearches} onHide={handleCloseStoredSearches}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              Busquedas guardadas
            </Modal.Title>
          </Modal.Header>
          <StoredSearches search={selectOldSearch} />
        </Modal>
        <Modal show={visibilitySearchStored} onHide={() => { setVisibilitySearchStored(false) }}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              Busquedas guardadas
            </Modal.Title>
          </Modal.Header>
          <div className="pt-2 pb-4 px-3">
            Se ha guardado correctamente la busqueda realizada.
          </div>
        </Modal>
      </IonContent>
    </IonPage>
  )
}
