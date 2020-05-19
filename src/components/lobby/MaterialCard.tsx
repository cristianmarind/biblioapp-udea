import React, { useState } from 'react'
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
  IonList,
  IonIcon
} from '@ionic/react';
import {
  bookmarkOutline
} from 'ionicons/icons';
import { Modal, ProgressBar } from 'react-bootstrap';
import TextMaxSize from "./../general/textMaxSize/TextMaxSize"
import shareSocial from './../../assets/biblioapp/icons/compartir.png'
import star from './../../assets/biblioapp/icons/estrella.png'
import heart from './../../assets/biblioapp/icons/corazon.png'

import ProviderServices from './../../providerServices/index'
let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')

export default (props: any) => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(false)
  const [msg, setMsg] = useState(null)
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
    setMsg(null)
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
    setMsg(null)
    services.addMaterialToFavorites(currentMaterial.titleno).then(res => {
      setIsLoadingModal(false)
      setMsg(res.msg)
    }).catch(err => {
      setIsLoadingModal(false)
      setMsg(err.msg)
    })
  }

  const getAPAReference = () => {
    setIsLoadingModal(true)
    setMsg(null)
    services.getAPAReference(currentMaterial.isbn).then(res => {
      setAPAReference(res[0].referenciaBibliograficaApa)
      setIsLoadingModal(false)
    }).catch(err => {
      setMsg(err.msg)
      setIsLoadingModal(false)
    })
  }

  return (
    <div>
      <IonCard onClick={() => { showMoreInfo(props.titleno) }} className="border custom-border-color-green">
        <IonCardHeader>
          <IonCardTitle className="custom-text-green font-weight-bold">
            <TextMaxSize sizeDefault="45" text={props.title} />
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="4">
                <img src={props.image || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
              </IonCol>
              <IonCol size="8">
                <IonText>
                  {
                    props.autores ?
                      (<div>
                        <span className="custom-text-green font-weight-bold">Autores: </span>
                        <TextMaxSize sizeDefault="80" text={props.autores} />
                      </div>) : null
                  }
                  {
                    props.isbn ?
                      (<div>
                        <span className="custom-text-green font-weight-bold">ISBN: </span>
                        <span>{props.isbn}</span>
                      </div>) : null
                  }
                  {
                    props.count > 0 ?
                      (<div>
                        <span className="custom-text-green font-weight-bold">Número ejemplares: </span>
                        <span>{props.count}</span>
                      </div>) : null
                  }
                  {
                    props.description ?
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
        {
          isLoadingModal ?
            (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />) : null
        }
        <Modal.Body>
          <div style={{
            maxHeight: "80vh",
            overflowY: "auto"
          }}>
            <IonText>
              <IonImg
                className="w-25 float-left mr-3"
                src={currentMaterial.image_url || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"}
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
            currentMaterial.isbn && apaReference ? (<div className="bg-light rounded p-2" dangerouslySetInnerHTML={{ __html: apaReference }} />) : null
          }
          <IonGrid>
            <IonRow>
              <IonCol className="d-flex flex-column align-items-center" onClick={() => { addMaterialToFavorites() }} size="6">
                <div className="custom-icon-lg">
                  <IonImg src={heart} />
                </div>
                <IonText className="">Agregar a favoritos</IonText>
              </IonCol>
              {
                currentMaterial.isbn?
                (<IonCol className="d-flex flex-column align-items-center" onClick={() => { getAPAReference() }} size="6">
                <IonIcon className="mx-2" color="primary" size="large" icon={bookmarkOutline} />
                <IonText className="">Referencia APA</IonText>
              </IonCol>):null
              }
              <IonCol className="d-flex flex-column align-items-center" onClick={() => { }} size="6">
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
      </Modal>
      <Modal show={msg !== null} onHide={() => { setMsg(null) }}>
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