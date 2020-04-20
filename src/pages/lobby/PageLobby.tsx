import React, { useState } from 'react'
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
  IonButton,
  IonSlides, 
  IonSlide
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
import TextMaxSize from './../../components/general/textMaxSize/TextMaxSize'
import Recommendations from './../../components/lobby/Recommendations'
//import sss from './../../providerServices/services2'
let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')
let appKey = "UGT*Vh4e11@s";

export default () => {
  const [saveQueryVisibility, setSaveQueryVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')
  const [res, setRes] = useState<any>([])
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
  const handleClose = () => setShow(false);
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  const search = () => {
    setSaveQueryVisibility(true)
    setIsLoading(true)
    let response = [
      {
        titleno: "1390482",
        titulo: "A qualidade de vida do idoso: o caso da Cova da Beira",
        autores: "Santos, Ricardo Manuel da Fonseca (Autor)Santos, Paulo Miguel da Fonseca (Autor)Santos, Vera Lúcia Dias Batista (Autor)Duarte, Joao Carvalho (Autor)",
        isbn: "",
        image_url: "",
        ejemplares: "0",
        padre: "En Revista: Referencia, Revista de Enfermagem (Coimbra) - Volumen 03, Número 11, Diciembre 2013Volumen 03, Nú"
      },
      {
        titleno: "1337185",
        titulo: "A transição de saúde e as mudanças na expectativa de vida saudável da população idosa: possíveis impactos da prevenção de doenças crônicas",
        autores: "Campolina, Alessandro Gonçalves (Autor)Adami, Fernando (Autor)Santos, Jair Licio Ferreira (Autor)Lebrao, Maria Lucia (Autor)",
        isbn: "",
        image_url: "",
        ejemplares: "0",
        padre: "En Revista: Cadernos de Saúde Pública (Rio de Janeiro) - Vol. 29, No. 06, Jun. 2013Vol. 29, No. 06, Jun. 2013"
      },
      {
        titleno: "1302226",
        titulo: "Actividad física y estilo de vida saludable",
        autores: "Capdevila Ortis, Lluis (Autor)",
        isbn: "9788493434946",
        image_url: "http://covers.openlibrary.org/b/isbn/9788493434946-M.jpg",
        ejemplares: "1",
        padre: "",
      },
      {
        titleno: "1302226",
        titulo: "Actividad física y estilo de vida saludable",
        autores: "Capdevila Ortis, Lluis (Autor)",
        isbn: "9788493434946",
        image_url: "http://covers.openlibrary.org/b/isbn/9788493434946-M.jpg",
        ejemplares: "1",
        padre: "",
      },
      {
        titleno: "1323636",
        titulo: "Amnésia pós-traumática e qualidade de vida pós-trauma",
        autores: "Silva, Silvia Cristina Fürbringer e (Autor)Settervall, Cristina Helena Costanti (Autor)Sousa, Regina Marcia Cardoso de (Autor)",
        isbn: "",
        image_url: "",
        ejemplares: "0",
        padre: "En Revista: Revista da Escola de Enfermagem da U.S.P. (Brasil) - Vol. 46, Oct. 2012. Número especialVol. 46, Oct. 2012. Número especial - Amnésia pós-traumática e qualidade de vida pós-trauma"
      }
    ]
    setRes(response)
    setIsLoading(false)
    return
    services.postModel('/services_OLIB/APP_ConsultarCatalogo.php', [{ appKey: appKey, busqueda: query, pagina: "1", regxpagina: "10" }]).then(res => {
      let response = JSON.parse(res.data[0].respuesta.split("\n").join(""))
      console.log(response);
      
      setRes(response)
      setIsLoading(false)
    }).catch(err => {
      setIsLoading(false)
      console.log(err);
    })
  }
  const changeCurrentMaterial = (titleno:any) => {
    setIsLoading(true)
    setShow(true)
    setMaterial({
      titleno: "1390482",
      titulo: "Referencia, Revista de Enfermagem (Coimbra) - Volumen 03, Número 11, Diciembre 2013",
      tipo_publicacion: "Impreso - Emisión de Seriada",
      image_url: "",
      autores: [],
      publicacion: "2013",
      descripcion_fisica: "",
      idioma: "Portugués",
      isbn: "",
      nota: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum elementum, mauris et malesuada tincidunt, nibh magna vulputate metus, in mollis lorem nulla in leo. Praesent dolor sem, sodales hendrerit aliquam at, sagittis sit amet massa. Vivamus vehicula viverra ipsum luctus fermentum. Aenean dui ligula, facilisis eget sollicitudin et, vestibulum a dolor. Ut rhoncus finibus posuere. Praesent nisl nibh, tempor vitae.",
      es_reservable: "false",
      disponibilidad: [{
        barcode: "0992720",
        localizacion: "Biblioteca de Enfermería",
        signatura: "",
        estado: "Disponible",
        categoria: "5 Días",
        coleccion: "Colección de Revistas",
        estante: "",
        etiqueta: "white",
        mostrargeo: "false",
      },
      {
        barcode: "234234",
        localizacion: "Biblioteca central",
        signatura: "",
        estado: "Disponible",
        categoria: "5 Días",
        coleccion: "Colección de Revistas",
        estante: "",
        etiqueta: "white",
        mostrargeo: "false",
      }
    ]
    })
    setIsLoading(false)
    return
    services.postModel('/services_OLIB/APP_ConsultarDetallesTitulo.php', [{ appKey: appKey,  titleno: titleno }]).then(res => {
      let response = JSON.parse(res.data[0].respuesta.split("\n").join(""))[0]
      console.log(response);
      
    }).catch(err => {
      setIsLoading(false)
      console.log(err);
    })
  }
  let loading, 
  saveQuery
  if (isLoading) {
    loading = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
  }
  if (saveQueryVisibility) {
    saveQuery = (
      <IonItem>
        <IonIcon size="small" slot="start" icon={saveSharp} />
        <IonLabel>Guardar búsqueda</IonLabel>
      </IonItem>
    )
  }


  let lobby
  if (!res.length) {
    lobby = (
      <div className="mt-3">
        <Recommendations />
      </div>
    )
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
          { saveQuery }
          <IonItem>
            <IonIcon size="small" slot="start" icon={list} />
            <IonLabel>Ver búsquedas almacenadas</IonLabel>
          </IonItem>
          {lobby}
          <div className="mt-3"></div>
          {
            res.map((item:any, index:any) => {
              return (
                <div key={index} onClick={() => { changeCurrentMaterial(item.titleno) }}>
                  <MaterialCard 
                    title={item.titulo} 
                    image={item.image_url} 
                    autores={item.autores} 
                    isbn={item.isbn}
                    count={item.ejemplares}
                    description={item.padre}
                  />
                </div>
              )
            })
          }
        </IonList>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="custom-text-green">
              <TextMaxSize sizeDefault="35" text={currentMaterial.titulo} label="ver titulo completo" />
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
                  src={currentMaterial.image_url || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"}
                />
                <div>
                  <span className="custom-text-green font-weight-bold">Tipo: </span>
                  <span>{currentMaterial.tipo_publicacion}</span>
                </div>
                <div>
                  <span className="custom-text-green font-weight-bold">Publicación: </span>
                  <span>{currentMaterial.publicacion}</span>
                </div>
                <div>
                  <span className="custom-text-green font-weight-bold">Descripción: </span>
                  <span>{currentMaterial.descripcion_fisica}</span>
                </div>
                <div>
                  <span className="custom-text-green font-weight-bold">Idioma: </span>
                  <span>{currentMaterial.idioma}</span>
                </div>
                <div>
                  <span className="custom-text-green font-weight-bold">Resumen: </span>
                  <TextMaxSize sizeDefault="100" text={currentMaterial.nota} />
                </div>
              </IonText>
              <span className="custom-text-green font-weight-bold mt-3">Disponibilidad: </span>
              <IonSlides pager={true} options={slideOpts}>
                {
                  currentMaterial.disponibilidad.map((item:any, index:any) => {
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
                            <span>{item.localizacion}</span>
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