import React from 'react'
import { 
  trashOutline
 } from 'ionicons/icons';
import { IonPage, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText, IonIcon, IonAlert } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from './../../../providerServices/index'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';

let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')

export default class MyReservations extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      myReservations: [],
      isLoading: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    this.getMyReservations()
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
            this.state.myReservations.length?
            (this.state.myReservations.map((item: any, index: any) => {
              return (
                <div key={index} className="position-relative">
                  <IonCard className="border custom-border-color-green pb-4">
                    <IonCardHeader>
                      <IonCardTitle className="custom-text-green font-weight-bold">
                        <TextMaxSize sizeDefault="45" text={item.titulo} />
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonGrid>
                        <IonRow>
                          <IonCol size="4">
                            <img src={item.image_url || "https://www.timvandevall.com/wp-content/uploads/2014/01/Book-Cover-Template-s.jpg"} alt="Img" />
                          </IonCol>
                          <IonCol size="8">
                            <IonText>
                              {
                                item.estado?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Estado: </span>
                                  <TextMaxSize sizeDefault="80" text={item.estado} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.fecha_reserva?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Fecha de reserva: </span>
                                  <TextMaxSize sizeDefault="80" text={item.fecha_reserva} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.fecha_recoger?
                                (<div>
                                  <span className="custom-text-green font-weight-bold">Fecha a recoger: </span>
                                  <TextMaxSize sizeDefault="80" text={item.fecha_recoger} labelVisible={false} />
                                </div>):null
                              }
                              {
                                item.observaciones?
                                (<div>
                                  <TextMaxSize sizeDefault="80" text={item.observaciones} labelVisible={false} />
                                </div>):null
                              }
                              
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
                    onClick={() => { this.deleteReservation(/*item.titleno*/) }} 
                  >
                    <IonIcon size="small" icon={trashOutline} />
                  </IonButton>
                </div>
              )
            })):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }

        </IonContent>
      </IonPage>
    )
  }

  getMyReservations(){
    this.setState({
      myReservations: [],
      isLoading: true,
      errorMessage: ""
    })
    services.getMyReservations().then(res => {
      this.setState({
        myReservations: res,
        isLoading: false,
        errorMessage: ""
      })
    }).catch(err => {
      this.setState({
        myReservations: [],
        isLoading: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }

  deleteReservation(/*titleno */){
    /*this.setState({
      isLoading: true
    })
    services.getMyReservations().then(res => {
      this.setState({
        myReservations: res,
        isLoading: false
      })
    }).catch(err => {
      this.setState({
        myReservations: [],
        isLoading: false
      })
      console.log(err);
    })*/
  }
}