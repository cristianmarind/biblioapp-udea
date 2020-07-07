import React, { useState } from 'react'
import { Plugins } from '@capacitor/core';
import { useHistory } from "react-router-dom";
import {
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardHeader,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonSlides,
  IonSlide,
  IonList
} from '@ionic/react';
import { Modal, ProgressBar } from 'react-bootstrap';
import TextMaxSize from "./../general/textMaxSize/TextMaxSize"
import shareSocial from './../../assets/biblioapp/icons/compartir.png'
import star from './../../assets/biblioapp/icons/estrella.png'
import heart from './../../assets/biblioapp/icons/corazon.png'
import reserveIcon from './../../assets/biblioapp/icons/reservas.png'
import refIcon from './../../assets/biblioapp/icons/referencia.png'
import utilities from './../../utilities/index'
import HOSTS from './../../providerServices/hosts.js'
import ProviderServices from './../../providerServices/index'

import defaultMaterialImage from './../../assets/biblioapp/caratulaMaterialNoDisponible.png'

let services = new ProviderServices(HOSTS.CIRENE.HOST)
const { Share } = Plugins

export default (props: any) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [msg, setMsg] = useState("")
  const [apaReference, setAPAReference] = useState('')
  const [visibilityMaterialDetail, setVisibilityMaterialDetail] = useState(false)
  const handleCloseMaterialDetail = () => setVisibilityMaterialDetail(false);
  const [currentMaterial, setMaterial] = useState<any>({
    titleno: "",
    titulo: "",
    tipo_publicacion: "",
    image_url: "",
    autores: [],
    publicacion: "",
    descripcion_fisica: "",
    idioma: "",
    isbn: "",
    nota: "",
    es_reservable: "",
    disponibilidad: []
  })
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  const showMoreInfo = (titleno: any) => {
    if (!titleno) {
      return
    }
    setIsLoading(true)
    setMsg("")
    services.consultarDetallesTitulo(titleno).then(res => {
      setMaterial(res);
      setIsLoading(false)
      setVisibilityMaterialDetail(true)
    }).catch(err => {
      setIsLoading(false)
      setMsg(err.msg)
      console.log(err);
    })
  }

  const addMaterialToFavorites = () => {
    setIsLoadingModal(true)
    setMsg("")
    services.addMaterialToFavorites(currentMaterial.titleno).then(res => {
      setIsLoadingModal(false)
      setMsg(res.msg)
    }).catch(err => {
      console.log(err);
      
      setIsLoadingModal(false)
      setMsg(err.msg)
    })
  }

  const reserve = () => {
    setIsLoadingModal(true)
    setMsg("")
    services.reserveMaterial(currentMaterial.titleno).then(res => {
      setIsLoadingModal(false)
      setMsg(res.msg)
    }).catch(err => {
      setIsLoadingModal(false)
      setMsg(err.msg)
    })
  }

  const getAPAReference = () => {
    setIsLoadingModal(true)
    setMsg("")
    setAPAReference("")
    services.getAPAReference(currentMaterial.isbn).then(res => {
      let ref = res[0].referenciaBibliograficaApa
      if (ref.search('flash-notice') > 0) {
        setMsg("No se pudo generar la referencia, intente mas tarde.")
      }else{
        setAPAReference(ref.trim())
      }
      setIsLoadingModal(false)
    }).catch(err => {
      setMsg(err.msg)
      setIsLoadingModal(false)
    })
  }

  const shareMaterial = () => {
    Share.share({
      title: 'Compartir material',
      text: `¡Hola! Te comparto este material bibliográfico del Sistema de Bibliotecas desde la BiblioApp. Material: ${currentMaterial.titulo}`,
      url: `http://aplicacionesbiblioteca.udea.edu.co/biblioApp/?isbn=${currentMaterial.isbn}&titleno=${currentMaterial.titleno}`,
      dialogTitle: 'Compartir material'
    })
  }

  const copyReference = () => {
    var aux = document.createElement("input");
    aux.setAttribute("value", utilities.stripHtml(apaReference));
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

  return (
    <div className="">
      <IonCard onClick={() => { showMoreInfo(props.titleno) }} className="border custom-border-color-green my-1">
        <IonCardHeader className={props.MaterialCardMode == '1'?'pt-2':''}>
          <IonCardTitle className="custom-text-green font-weight-bold font-size-large">
            <TextMaxSize sizeDefault="45" text={props.title} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className={props.MaterialCardMode == '1'?'pb-0':''}>
          <IonGrid>
            <IonRow>
              <IonCol size='4'>
                <img src={props.image || defaultMaterialImage} alt="Img" />
              </IonCol>
              <IonCol size='8'>
                <IonText>
                  {
                    props.autores ?
                      (<div>
                        <span className="custom-text-green font-weight-bold">Autores: </span>
                        <TextMaxSize sizeDefault="80" text={props.autores} />
                      </div>) : null
                  }
                  {
                    props.isbn && props.MaterialCardMode != '1' ?
                      (<div>
                        <span className="custom-text-green font-weight-bold">ISBN: </span>
                        <span>{props.isbn}</span>
                      </div>) : null
                  }
                  {
                    props.count > 0 && props.MaterialCardMode != '1'?
                      (<div>
                        <span className="custom-text-green font-weight-bold">Número ejemplares: </span>
                        <span>{props.count}</span>
                      </div>) : null
                  }
                  {
                    props.description && props.MaterialCardMode != '1'?
                      (<div>
                        <span className="custom-text-green font-weight-bold">Información: </span>
                        <TextMaxSize sizeDefault="80" text={props.description} labelVisible={false} />
                      </div>) : null
                  }
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          {
            isLoading ?
              (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />) : null
          }
        </IonCardContent>
      </IonCard>
      <Modal show={visibilityMaterialDetail} onHide={handleCloseMaterialDetail}>
        <Modal.Header closeButton>
          <Modal.Title className="custom-text-green">
            <TextMaxSize sizeDefault="35" text={currentMaterial.titulo} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <IonText>
              <IonImg
                className="w-25 float-left mr-3"
                src={currentMaterial.image_url || defaultMaterialImage}
              />
              {
                currentMaterial.tipo_publicacion ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">Tipo: </span>
                    <span>{currentMaterial.tipo_publicacion}</span>
                  </div>) : null
              }
              {
                currentMaterial.publicacion ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">Publicación: </span>
                    <span>{currentMaterial.publicacion}</span>
                  </div>) : null
              }
              {
                currentMaterial.descripcion_fisica ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">Descripción: </span>
                    <span>{currentMaterial.descripcion_fisica}</span>
                  </div>) : null
              }
              {
                currentMaterial.idioma ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">Idioma: </span>
                    <span>{currentMaterial.idioma}</span>
                  </div>) : null
              }
              {
                currentMaterial.isbn ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">ISBN: </span>
                    <span>{currentMaterial.isbn}</span>
                  </div>) : null
              }
              {
                currentMaterial.nota ?
                  (<div>
                    <span className="custom-text-green font-weight-bold">Resumen: </span>
                    <TextMaxSize sizeDefault="100" text={currentMaterial.nota} />
                  </div>) : null
              }
            </IonText>
            {
              currentMaterial.disponibilidad.length > 0 ?
                (<div>
                  <span className="custom-text-green font-weight-bold mt-3">Disponibilidad</span>
                  <IonSlides pager={true} options={slideOpts}>
                    {
                      currentMaterial.disponibilidad.map((item: any, index: any) => {
                        return (
                          <IonSlide style={{
                            fontSize: 'small'
                          }} key={index}>
                            <IonList className="mb-5">
                              <div className="text-left">
                                <span className="font-weight-bold">Localización: </span>
                                <span>{item.localizacion}</span>
                              </div>
                              <div className="text-left">
                                <span className="font-weight-bold">Colección y estante: </span>
                                <span>{item.coleccion + ", " + item.estante}</span>
                              </div>
                              <div className="text-left">
                                <span className="font-weight-bold">Signatura: </span>
                                <span>{item.signatura}</span>
                              </div>
                              <div className="text-left">
                                <span className="font-weight-bold">Categoría: </span>
                                <span>{item.categoria}</span>
                              </div>
                              <div className="text-left">
                                <span className="font-weight-bold">Estado: </span>
                                <span>{item.estado}</span>
                              </div>
                            </IonList>
                          </IonSlide>
                        )
                      })
                    }
                  </IonSlides>
                </div>) : null
            }
          </div>
          {
            currentMaterial.isbn && apaReference?
            (<div className="position-relative">
              <div className="bg-light rounded p-2" dangerouslySetInnerHTML={{ __html: apaReference }}
                onClick={() => {
                  copyReference()
                }}
              />
              <span 
                onClick={() => {
                  copyReference()
                }} 
                className="position-absolute bottom-0 rigth-0 custom-bg-green text-light py-1 px-2"
              >
                Copiar
              </span>
            </div>):null
          }
          <IonGrid>
            <IonRow>
              <IonCol className="d-flex flex-column align-items-center" onClick={() => { reserve() }} size="6">
                <div className="custom-icon-lg">
                  <IonImg src={reserveIcon} />
                </div>
                <IonText>Reservar</IonText>
              </IonCol>
              <IonCol className="d-flex flex-column align-items-center" onClick={() => { addMaterialToFavorites() }} size="6">
                <div className="custom-icon-lg">
                  <IonImg src={heart} />
                </div>
                <IonText className="text-center" >Agregar a mi lista de deseos</IonText>
              </IonCol>
              {
                currentMaterial.isbn?
                (<IonCol className="d-flex flex-column align-items-center" onClick={() => { getAPAReference() }} size="6">
                  <div className="custom-icon-lg">
                    <IonImg src={refIcon} />
                  </div>
                  <IonText className="">Referencia APA</IonText>
                </IonCol>):null
              }
              <IonCol className="d-flex flex-column align-items-center" onClick={() => { shareMaterial() }} size="6">
                <div className="custom-icon-lg">
                  <IonImg src={shareSocial} />
                </div>
                <IonText className="">Compartir</IonText>
              </IonCol>
              <IonCol size="6" className="d-flex flex-column align-items-center" 
                onClick={() => { 
                  handleCloseMaterialDetail()
                  history.push({
                    pathname: '/material/materiaReview',
                    state: {
                      titleno: currentMaterial.titleno,
                      title: currentMaterial.titulo
                    }
                  }) 
              }}>
                <div className="custom-icon-lg">
                  <IonImg src={star} />
                </div>
                <IonText className="">Añadir reseña</IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Modal.Body>
        {
          isLoadingModal ?
            (<ProgressBar style={{ "height": ".7em" }} animated now={100} variant="success" />) : null
        }
      </Modal>
      <Modal show={msg !== ""} onHide={() => { setMsg("") }}>
        <Modal.Header closeButton>
          <Modal.Title className="custom-text-green">
            Biblioapp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg}
        </Modal.Body>
      </Modal>
    </div>
  )
}