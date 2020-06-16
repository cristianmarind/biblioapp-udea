import React from 'react'
import { IonPage, IonContent, IonButton, IonIcon, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';
import {
    trashOutline,
    calendarSharp,
    timeSharp, locationSharp, readerSharp, informationCircleSharp
} from 'ionicons/icons';

import { ProgressBar, Modal } from 'react-bootstrap';

import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';
import ProviderServices from './../../../providerServices/index';

import HOSTS from './../../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class MyEvents extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            eventList: [],
            isLoading: false,
            needUpdate: false,
            errorMessage: '',
            deleteProcess: 0,
            currentItem: null,
            visibilityEventDetail: false,
            eventDetails: ,
            mayorInfo: ""

        }
    }
    handleCloseMaterialDetail = () => this.setState({ visibilityEventDetail: false });
    componentDidMount() {
        this.getEventList()
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.needUpdate !== this.state.needUpdate && this.state.needUpdate) {
            this.getEventList()
        }
    }

    render() {
        let loadingTemplate
        if (this.state.isLoading) {
            loadingTemplate = <ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />
        }
        return (
            <IonPage>
                <HeaderBiblioapp />
                {loadingTemplate}
                <IonContent>                    
                    {
                        this.state.eventList.length ?
                            (
                                this.state.eventList.map((item: any, index: any) => {
                                    return (
                                        <div key={index} className="position-relative">
                                            <IonCard onClick={() => { this.showMoreInfo(item) }} className="border custom-border-color-green">
                                                <IonCardHeader>
                                                    <IonCardTitle className="custom-text-green font-weight-bold">
                                                        <TextMaxSize sizeDefault="45" text={item.tituloEvento} />
                                                    </IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonGrid>
                                                        <IonRow>
                                                            <IonCol size="5">
                                                                <img src={item.urlImagen || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
                                                            </IonCol>
                                                            <IonCol size="7">
                                                                <IonText>
                                                                    <div>
                                                                        {/* <span className="custom-text-green font-weight-bold">Fecha: </span> */}
                                                                        <IonIcon className="custom-text-green pr-1" icon={calendarSharp} />
                                                                        <TextMaxSize sizeDefault="80" text={item.fechaInicioMostrar} labelVisible={false} />
                                                                    </div>
                                                                    <div>
                                                                        <IonIcon className="custom-text-green pr-1" icon={timeSharp} />
                                                                        {/* <span className="custom-text-green font-weight-bold">Hora: </span> */}
                                                                        <TextMaxSize sizeDefault="80" text={item.horaInicioMostrar} labelVisible={false} />
                                                                    </div>
                                                                    <div>
                                                                        <IonIcon className="custom-text-green pr-1" icon={locationSharp} />
                                                                        {/* <span className="custom-text-green font-weight-bold">Ubicación: </span> */}
                                                                        <TextMaxSize sizeDefault="80" text={item.lugarEvento} labelVisible={false} />
                                                                    </div>
                                                                </IonText>
                                                            </IonCol>
                                                        </IonRow>
                                                    </IonGrid>
                                                </IonCardContent>
                                            </IonCard>
                                            <IonButton
                                                className="position-absolute"
                                                style={{
                                                    bottom: '0',
                                                    right: '1em'
                                                }}
                                                color="danger"
                                                onClick={() => { this.setState({ deleteProcess: 1, currentItem: item.idEvento }) }}
                                            >
                                                <IonIcon size="small" icon={trashOutline} />
                                            </IonButton>
                                        </div>
                                    )
                                })
                            ) : (<div className="text-center pt-3">{this.state.errorMessage}</div>)
                    }
                    <Modal show={this.state.visibilityEventDetail == true} onHide={this.handleCloseMaterialDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title className="custom-text-green">
                                <TextMaxSize sizeDefault="35" text={this.state.eventDetails.tituloEvento} />
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{
                                maxHeight: "80vh",
                                overflowY: "auto"
                            }}></div>
                            <IonText>
                                {
                                    this.state.eventDetails.fechaInicioMostrar ?
                                        (<div className="container-fluid">
                                            <div className="row">
                                                <div className="col-3 p-0">
                                                    <span className=" custom-text-green font-weight-bold ">Inicio:  </span>
                                                </div>
                                                <div className="col-5 p-0">
                                                    <IonIcon className="custom-text-green " icon={calendarSharp} />
                                                    <span>{this.state.eventDetails.fechaInicioMostrar}</span>
                                                </div>
                                                <div className="col-4 p-0">
                                                    <IonIcon className="custom-text-green " icon={timeSharp} />
                                                    <span>{this.state.eventDetails.horaInicioMostrar}</span>
                                                </div>
                                            </div>
                                        </div>) : null
                                }
                                {
                                    this.state.eventDetails.fechaFinMostrar ?
                                        (<div className="container-fluid">
                                            <div className="row">
                                                <div className="col-3 p-0">
                                                    <span className=" custom-text-green font-weight-bold ">Fin:  </span>
                                                </div>
                                                <div className="col-5 p-0">
                                                    <IonIcon className="custom-text-red " icon={calendarSharp} />
                                                    <span>{this.state.eventDetails.fechaFinMostrar}</span>
                                                </div>
                                                <div className="col-4 p-0">
                                                    <IonIcon className="custom-text-red " icon={timeSharp} />
                                                    <span>{this.state.eventDetails.horaFinMostrar}</span>
                                                </div>
                                            </div>
                                        </div>) : null
                                }
                                <div className="container mt-2 p-0">
                                    <IonIcon className="custom-text-green mr-2 align-self-center" icon={readerSharp} />
                                    <span className=" custom-text-green font-weight-bold ">Descripción del evento  </span>
                                </div>
                                <div className="container mt-2 p-0">
                                    <p className="text-justify">{this.state.eventDetails.descripcionEvento}</p>
                                </div>
                                <div className="container mt-2 p-0">
                                    <IonIcon className="custom-text-green mr-2" icon={informationCircleSharp} />
                                    <span className=" custom-text-green font-weight-bold ">Más información</span>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className=" overflow-auto col p-0">
                                            {ReactHtmlParser(this.state.mayorInfo)}
                                        </div>
                                    </div>
                                </div>
                                <div className="container mt-2 p-0">
                                    <a href={this.state.eventDetails.urlVerMas}><span className=" custom-text-green font-weight-bold ">Ver más [+]</span></a>
                                </div>
                            </IonText>

                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.deleteProcess == 1} onHide={() => { this.setState({ deleteProcess: 0 }) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className="custom-text-green">
                                BiblioApp
                            </Modal.Title>
                        </Modal.Header>
                        <div className="pt-2 pb-4 px-3">
                            <div className="d-flex justify-content-center">
                                <span>¿Esta seguro que desea eliminar el elemento de su lista de deseos?</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <IonButton onClick={() => { this.setState({ deleteProcess: 0 }) }}>
                                    Cancelar
                                </IonButton>
                                <IonButton color="danger" onClick={() => { this.deleteEventListItem(this.state.currentItem) }}>Eliminar</IonButton>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={this.state.deleteProcess == 2} onHide={() => { this.setState({ deleteProcess: 0 }) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className="custom-text-green">
                                BiblioApp
                            </Modal.Title>
                        </Modal.Header>
                        <div className="pt-2 pb-4 px-3">
                            <div className="d-flex justify-content-center">
                                <span>Ha eliminado con éxito.</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <IonButton onClick={() => { this.setState({ deleteProcess: 0 }) }}>
                                    Cerrar
                                </IonButton>
                            </div>
                        </div>
                    </Modal>
                    <Modal show={this.state.deleteProcess == -1} onHide={() => { this.setState({ deleteProcess: 0 }) }}>
                        <Modal.Header closeButton>
                            <Modal.Title className="custom-text-green">
                                BiblioApp
                            </Modal.Title>
                        </Modal.Header>
                        <div className="pt-2 pb-4 px-3">
                            <div className="d-flex justify-content-center">
                                <span>No se pudo eliminar el item de su lista de deseos.</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <IonButton onClick={() => { this.setState({ deleteProcess: 0 }) }}>
                                    Cerrar
                                </IonButton>
                            </div>
                        </div>
                    </Modal>
                </IonContent>
            </IonPage>
        )
    }
    showMoreInfo = (Details: any) => {
        if (!Details) {
            return
        }
        this.setState({ eventDetails: Details, visibilityEventDetail: true, mayorInfo: Details.mayorInfoEvento.replace("width: 950px;", "") })

    }
    deleteEventListItem = (idEvent: any) => {
        this.setState({
            isLoading: true,
            needUpdate: false,
            deleteProcess: 0
        })
        services.deleteEventListItem(idEvent).then(res => {
            this.setState({
                isLoading: false,
                needUpdate: true,
                deleteProcess: 2
            })
            //console.log(res)
        }).catch(err => {
            this.setState({
                isLoading: false,
                needUpdate: false,
                deleteProcess: -1
            })
            console.log(err);
        })
    }

    getEventList = () => {
        this.setState({
            eventList: [],
            isLoading: true,
            needUpdate: false,
            errorMessage: ""
        })
        services.getEventList().then(res => {
            console.log(res);
            this.setState({
                eventList: res,
                isLoading: false,
                needUpdate: false,
                errorMessage: ""
            })


        }).catch(err => {
            this.setState({
                eventList: [],
                isLoading: false,
                needUpdate: false,
                errorMessage: err.msg
            })
            console.log(err);
        })
        

    }
}