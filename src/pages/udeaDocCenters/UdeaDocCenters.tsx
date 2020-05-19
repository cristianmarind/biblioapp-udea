import React from 'react'
import { IonPage, IonContent, IonList, IonItem, IonIcon, IonLabel, IonText, IonImg, IonButton } from '@ionic/react';
import {
  Tabs,
  Tab,
  Modal
} from 'react-bootstrap';
import {
  locateOutline
} from 'ionicons/icons';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import TextMaxSize from "./../../components/general/textMaxSize/TextMaxSize"
import ProviderServices from './../../providerServices/index'

export default class UdeaDocCenters extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      libraries: [],
      currentLibrary: {
        id: '',
        name: '',
        type: '',
        address: '',
        phone: '',
        weekSchedule: '',
        saturdaySchedule: '',
        sundaySchedule: '',
        description: '',
        locationMap: ''
      },
      isShow: false
    }
  }

  async componentDidMount() {
    let providerServices = new ProviderServices('http://localhost:3000/api')
    providerServices.getModel('/libraries', {
      where: {
        type: 'centro_doc'
      }
    }).then(res => {
      this.setState({
        libraries: res.data
      })

    })

  }

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp />
        <IonContent>
          <IonList>
            {
              this.state.libraries.map((library: any, libraryIndex: any) => {
                return (
                  <IonItem key={libraryIndex}>
                    <a href={library.locationMap}>
                      <IonIcon className="pr-1" icon={locateOutline} />
                    </a>
                    <IonLabel onClick={() => { this.setState({ currentLibrary: library, isShow: true }) }}>{library.name}</IonLabel>
                  </IonItem>
                )
              })
            }
          </IonList>

          <Modal show={this.state.isShow} onHide={() => { this.setState({ isShow: false }) }}>
            <Modal.Header closeButton>
              <Modal.Title className="custom-text-green">
                <TextMaxSize sizeDefault="35" text={this.state.currentLibrary.name} />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{
                maxHeight: "80vh",
                overflowY: "auto"
              }}>
                <IonText>
                  <div>
                    <span className="custom-text-green font-weight-bold">Dirección: </span>
                    <span>{this.state.currentLibrary.address}</span>
                  </div>
                  <div>
                    <span className="custom-text-green font-weight-bold">Teléfono: </span>
                    <span>{this.state.currentLibrary.phone}</span>
                  </div>
                  <hr />
                  <div>
                    <span className="custom-text-green font-weight-bold">Horario de atención al público</span>
                    <div className="pl-2">
                      <div>
                        <span className="custom-text-green font-weight-bold">Lunes a viernes: </span>
                        <span>{this.state.currentLibrary.weekSchedule}</span>
                      </div>
                      <div>
                        <span className="custom-text-green font-weight-bold">Sábados: </span>
                        <span>{this.state.currentLibrary.saturdaySchedule}</span>
                      </div>
                      <div>
                        <span className="custom-text-green font-weight-bold">Domingo: </span>
                        <TextMaxSize sizeDefault="100" text={this.state.currentLibrary.sundaySchedule} />
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="pb-2">
                    <TextMaxSize sizeDefault="100" text={this.state.currentLibrary.description} />
                  </div>
                  <a className="text-light" href={this.state.currentLibrary.locationMap}>
                    <IonButton>
                      <IonIcon className="pr-1" icon={locateOutline} />
                      Como llegar
                    </IonButton>
                  </a>
                </IonText>
              </div>
            </Modal.Body>
          </Modal>
        </IonContent>
      </IonPage>
    )
  }
}