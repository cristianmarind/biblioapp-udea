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

import HOSTS from './../../providerServices/hosts.js'
import ProviderServices from './../../providerServices/index'

export default class UdeaLibraries extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      librariesLocation: [{
        title: 'Medellin',
        libraries: []
        },
        {
          title: 'Regiones',
          libraries: []
        }
      ],
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

  async componentDidMount(){
    let providerServices = new ProviderServices(HOSTS.LIBRARIES.HOST)
    let medellin = [], regiones = []
    try {
      let res = await providerServices.getModel('/libraries', {
        where: {
          type: 'medellin'
        }
      })
      medellin = res.data
      
      res = await providerServices.getModel('/libraries', {
        where: {
          type: 'regiones'
        }
      })
      regiones = res.data
      this.setState({
        librariesLocation: [{
          title: 'Medellin',
          libraries: medellin
          },
          {
            title: 'Regiones',
            libraries: regiones
          }
        ]
      })
    } catch (error) {
      
    }
    

  }

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp />
        <IonContent>
          <div className="custom-bg-fluorescent-green text-light text-center py-2">
            Bibliotecas UdeA
          </div>
          <Tabs defaultActiveKey="libraryLocation-0" id="tab-udea-libraires">
            {
              this.state.librariesLocation.map((item: any, index: any) => {
                return (
                  <Tab key={index} eventKey={`libraryLocation-${index}`} title={item.title}>
                    <IonList>
                      {
                        item.libraries.map((library: any, libraryIndex: any) => {
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
                  </Tab>
                )
              })
            }
          </Tabs>

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
                  <hr/>
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
                  <hr/>
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