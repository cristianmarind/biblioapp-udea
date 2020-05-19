import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonList, IonImg, IonButton, IonItem, IonLabel, IonInput } from '@ionic/react'
import { Modal, ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import logoVerde from './../../assets/universidad/logo_verde.png'
import biblioappLogo from './../../assets/biblioapp/azul.png'
import ProviderServices from './../../providerServices/index'


let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')

export default () => {
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const login = () => {
    setIsLoading(true)
    services.login(username, password).then(()=>{
      setIsLoading(false)
      history.push("/lobby")
    }).catch(err => {
      setMsg(err.msg)
      setIsLoading(false)
    })
  }
  let loadingTemplate
  if (isLoading) {
    loadingTemplate = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
  }
  return (
    <IonPage>
      <HeaderBiblioapp />
      <IonContent>
        {loadingTemplate}
        <IonList className="px-4">
          <IonImg className="mx-auto mb-5 mt-3" src={logoVerde} />
          <IonItem>
            <IonLabel position="floating">
              Usuario
            </IonLabel>
            <IonInput type="text"
              onIonChange={(e: any) => {
                setUsername(e.detail.value)
              }} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">
              Contraseña
            </IonLabel>
            <IonInput type="password"
              onIonChange={(e: any) => {
                setPassword(e.detail.value)
              }} />
          </IonItem>
          <IonButton
            onClick={() => { login(); }}
            className="mt-3 custom-bg-fluorescent-green"
            color="none"
            expand="block"
          >
            Iniciar sesión >
          </IonButton>
          <IonItem>
            <IonImg src={biblioappLogo} />
          </IonItem>
        </IonList>
      </IonContent>
      <Modal show={msg !== null} onHide={()=> {setMsg(null)}}>
        <Modal.Header closeButton>
          <Modal.Title className="custom-text-green">
            Biblioapp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {msg}
        </Modal.Body>
      </Modal>
    </IonPage>
  )
}