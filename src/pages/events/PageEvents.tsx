import React from 'react'
import { IonPage, IonContent, IonButton, IonIcon, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import TextMaxSize from '../../components/general/textMaxSize/TextMaxSize';
import {
    trashOutline,
    calendarSharp,
    timeSharp, locationSharp
} from 'ionicons/icons';

import { ProgressBar } from 'react-bootstrap';


import ProviderServices from '../../providerServices/index'
import HOSTS from '../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class PageEvents extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            eventList: [],
            isLoading: false,
            needUpdate: false,
            errorMessage: '',
            deleteProcess: 0,
            currentItem: null
        }
    }
    componentDidMount() {
        this.getEventPublishedList()
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.needUpdate !== this.state.needUpdate && this.state.needUpdate) {
            this.getEventPublishedList()
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
                <IonContent>                    
                {
                        this.state.eventList.length ?
                            (
                                this.state.eventList.map((item: any, index: any) => {
                                    return (
                                        <div key={index} className="position-relative">
                                            <IonCard className="border custom-border-color-green">
                                                <IonCardHeader>
                                                    <IonCardTitle className="custom-text-green font-weight-bold">
                                                        <TextMaxSize sizeDefault="45" text={item.tituloEvento} />
                                                    </IonCardTitle>
                                                </IonCardHeader>
                                                <IonCardContent>
                                                    <IonGrid>
                                                        <IonRow>
                                                            <IonCol size="4">
                                                                <img src={item.urlImagenEvento || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
                                                            </IonCol>
                                                            <IonCol size="8">
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
                                            {/* <IonButton
                                                className="position-absolute"
                                                style={{
                                                    bottom: '0',
                                                    right: '1em'
                                                }}
                                                color="danger"
                                                onClick={() => { this.setState({ deleteProcess: 1, currentItem: item.idEvento }) }}
                                            >
                                                <IonIcon size="small" icon={trashOutline} />
                                            </IonButton> */}
                                        </div>
                                    )
                                })
                            ) : (<div className="text-center pt-3">{this.state.errorMessage}</div>)
                    }
                </IonContent>
            </IonPage>
        )
    }
    getEventPublishedList = () => {
        this.setState({
            eventList: [],
            isLoading: true,
            needUpdate: false,
            errorMessage: ""
        })
        services.getEventPublishedList().then(res => {
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