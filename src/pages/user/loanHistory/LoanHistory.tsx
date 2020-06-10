import React from 'react'
import { IonPage, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'

import HOSTS from './../../../providerServices/hosts.js'
import ProviderServices from './../../../providerServices/index'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';

let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class LoanHistory extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      loanHistory: [],
      isLoading: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.getLoanHistory()
  }

  render() {
    let loadingTemplate
    if (this.state.isLoading) {
      loadingTemplate = <ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />
    }
    return (
      <IonPage>
        <HeaderBiblioapp history={this.props.history} />
        {loadingTemplate}
        <IonContent>
          {
            this.state.loanHistory.length?
            (this.state.loanHistory.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <IonCard className="border custom-border-color-green">
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
                            <div>
                              <span className="custom-text-green font-weight-bold">Signatura: </span>
                              <TextMaxSize sizeDefault="80" text={item.signatura} labelVisible={false} />
                            </div>
                            <div>
                              <span className="custom-text-green font-weight-bold">Fecha de préstamo: </span><br />
                              <TextMaxSize sizeDefault="80" text={item.fecha_prestamo} labelVisible={false} />
                            </div>
                            <div>
                              <span className="custom-text-green font-weight-bold">Fecha de devolución: </span><br />
                              <TextMaxSize sizeDefault="80" text={item.fecha_devolucion} labelVisible={false} />
                            </div>
                            </IonText>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCardContent>
                  </IonCard>
                </div>
              )
            })):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }
        </IonContent>
      </IonPage>
    )
  }
  getLoanHistory = () => {
    this.setState({
      loanHistory: [],
      isLoading: true,
      errorMessage: ""
    })
    services.getLoanHistory().then(res => {
      this.setState({
        loanHistory: res,
        isLoading: false,
        errorMessage: ""
      })
    }).catch(err => {
      this.setState({
        loanHistory: [],
        isLoading: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }
}