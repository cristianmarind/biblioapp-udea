import React, { useState, useEffect, useRef } from 'react'
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
  arrowBackOutline,
  arrowForwardOutline
} from 'ionicons/icons';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import MaterialCard from './../../components/lobby/MaterialCard'
import ProviderServices from './../../providerServices/index'
import LogginLink from './../../components/general/logginLink/LogginLink'
import DayPhrases from '../../components/lobby/dayPhrases/DayPhrases'
import Recommendations from './../../components/lobby/Recommendations'
import StoredSearches from './../../components/lobby/StoredSearches'

import HOSTS from './../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)


export default (props: any) => {
  const [saveQueryVisibility, setSaveQueryVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [isResult, setIsResult] = useState(false)
  const [visibilityStoredSearches, setVisibilityStoredSearches] = useState(false)
  const [visibilitySearchStored, setVisibilitySearchStored] = useState(false)
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<any>([])
  const handleCloseStoredSearches = () => setVisibilityStoredSearches(false);
  const [errorMessage, setErrorMessage] = useState('')
  let lobbyContentRef = useRef<any>(null);

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

  const search = (q?: any, page?: any) => {
    let queryParam = q ? q : query
    if (!queryParam.trim()) {
      return
    }
    setRes([])
    setIsLoading(true)
    services.searchMaterial(queryParam, page, 10).then(res => {
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

  const nextPage = () => {
    if (res.length < 10) return
    search("", currentPage + 1)
    setCurrentPage(currentPage + 1)
    lobbyContentRef.current.scrollTop = 0
  }

  const backPage = () => {
    if (currentPage == 1) return
    search("", currentPage - 1)
    setCurrentPage(currentPage - 1)
    lobbyContentRef.current.scrollTop = 0
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

  const selectOldSearch = (oldSearch: any) => {
    setQuery(oldSearch)
    handleCloseStoredSearches()
    search(oldSearch)
  }


  let lobby
  if (!isResult) {
    if (localStorage.getItem('isLogged')) {
      lobby = (
        <div className="d-flex flex-column">
          <div className="mt-3">
            <DayPhrases />
          </div>
          <div className="mt-3">
            <Recommendations />
          </div>
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
      {isLoading ? (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />) : null}
      <IonContent>
        <div className="overflow-auto h-100 w-100" ref={lobbyContentRef}>
          <IonList>
            <IonItem>
              <IonLabel>
                <IonIcon slot="start" icon={searchSharp} />
              </IonLabel>
              <IonInput
                placeholder="Titulo, autor, materia"
                value={query}
                onIonChange={(e: any) => {
                  setQuery(e.detail.value)
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1)
                    search("", 1)
                  }
                }}
              />
              <IonButton onClick={() => { 
                setCurrentPage(1)
                search("", 1)
              }}>
                Buscar
              </IonButton>
            </IonItem>
            {
              saveQueryVisibility && localStorage.getItem('userId') ?
                (<IonItem onClick={() => { saveQuery() }}>
                  <IonIcon size="small" slot="start" icon={saveSharp} />
                  <IonLabel>Guardar búsqueda</IonLabel>
                </IonItem>) : null
            }
            {
              localStorage.getItem('userId') ?
                (<IonItem onClick={() => { setVisibilityStoredSearches(true) }}>
                  <IonIcon size="small" slot="start" icon={list} />
                  <IonLabel>Ver búsquedas almacenadas</IonLabel>
                </IonItem>) : null
            }
            {lobby}
            <div className="mt-3"></div>
            {
              res.length === 0 && isResult ? (<div className="text-center">{errorMessage}</div>) : null
            }
            {
              res.map((item: any, index: any) => {
                return (
                  <div key={index} className="my-3">
                    <MaterialCard
                      title={item.titulo}
                      image={item.image_url}
                      autores={item.autores}
                      isbn={item.isbn}
                      count={item.ejemplares}
                      description={item.padre}
                      titleno={item.titleno}
                    />
                  </div>
                )
              })
            }
            {
              res.length > 0 ?
                (
                  <div className="d-flex justify-content-around align-items-center mb-3 mt-1">
                    <div onClick={() => { backPage() }} className="p-1 custom-text-green d-flex justify-content-center align-items-center">
                      <IonIcon icon={arrowBackOutline} />
                    </div>
                    <div className="p-1 d-flex justify-content-center align-items-center">
                      {currentPage}
                    </div>
                    <div onClick={() => { nextPage() }} className="p-1 custom-text-green d-flex justify-content-center align-items-center">
                      <IonIcon icon={arrowForwardOutline} />
                    </div>
                  </div>
                ) : null
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
        </div>
      </IonContent>
    </IonPage>
  )
}
