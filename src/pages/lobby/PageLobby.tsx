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
  IonText,
  IonImg,
  IonButton
} from '@ionic/react';
import { 
  searchSharp, 
  saveSharp, 
  list,
  shareSocial,
  star,
  heart

 } from 'ionicons/icons';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import MaterialCard from './../../components/lobby/MaterialCard'
import ProviderServices from './../../providerServices/index'
//import sss from './../../providerServices/services2'
let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')
let appKey = "UGT*Vh4e11@s";

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')
  const [res, setRes] = useState([])
  const [currentMaterial, setMaterial] = useState<any>({})


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const search = () => {
    setIsLoading(true)
    services.postModel('/services_OLIB/APP_ConsultarCatalogo.php', [{ appKey: appKey, busqueda: query, pagina: "1", regxpagina: "10" }]).then(res => {
      let response = JSON.parse(res.data[0].respuesta.split("\n").join(""))
      console.log(response);
      
      setRes(response)
      setIsLoading(false)
    }).catch(err => {
      console.log(err);
    })
  }
  const changeCurrentMaterial = (titleno:any) => {
    setIsLoading(true)
    services.postModel('/services_OLIB/APP_ConsultarDetallesTitulo.php', [{ appKey: appKey,  titleno: titleno }]).then(res => {
      let response = JSON.parse(res.data[0].respuesta.split("\n").join(""))[0]
      console.log(response);
      setIsLoading(false)
      setShow(true)
      setMaterial(response)
    }).catch(err => {
      console.log(err);
    })
  }

  let loading
  if (isLoading) {
    loading = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
  }

  return (
    <IonPage>
      <HeaderBiblioapp />
      { loading }
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <IonIcon slot="start" icon={searchSharp} />
            </IonLabel>
            <IonInput 
              placeholder="Titulo, autor, materia"
              onIonChange={(e:any)=>{
                setQuery(e.detail.value)
              }}
            />
            <IonButton onClick={() => { search() }}>Buscar</IonButton>
          </IonItem>
          <IonItem>
            <IonIcon size="small" slot="start" icon={saveSharp} />
            <IonLabel>Guardar búsqueda</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon size="small" slot="start" icon={list} />
            <IonLabel>Ver búsquedas almacenadas</IonLabel>
          </IonItem>
          <div className="mt-3"></div>
          {
            res.map((item:any, index) => {
              return (
                <div key={index} onClick={() => { changeCurrentMaterial(item.titleno) }}>
                  <MaterialCard title={item.titulo} image={item.image_url} autores={item.autores} />
                </div>
              )
            })
          }
        </IonList>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">{currentMaterial.titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{
              maxHeight: "80vh",
              overflowY: "auto"
            }}>
              <IonText>
                <IonImg 
                  className="w-25 float-left mr-3"
                  src="https://www.iberlibro.com/imagenes/libros/cien-a%C3%B1os-de-soledad/textos.jpg" />
                Bruguera., 1981. tapa blanda. Literatura española. Literatura periodística: diarios, revistas, crónicas. Siglo XX. (821.134.2(861)-92"19") Bruguera. Barcelona. 1981. 20 cm. 890 p. Encuadernación en tapa blanda de editorial. Colección 'Narradores de Hoy', numero coleccion(48). García Márquez, Gabriel 1927-2014. Textos costeños. Recopilación y prólogo de Jacques Gilard. Gilard, Jacques. editor literario. Obra periodística (Editorial Bruguera). numero coleccion( v. 1) . Cubierta deslucida. ISBN: 8402077129 MQ01. Nº de ref. del artículo: 2026882
              </IonText>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <IonIcon className="mx-2" color="primary" size="large" icon={shareSocial} />
              <IonIcon className="mx-2" color="primary" size="large" icon={star} />
              <IonIcon className="mx-2" color="primary" size="large" icon={heart} />
            </div>
          </Modal.Body>
        </Modal>
      </IonContent>
    </IonPage>
  )
}