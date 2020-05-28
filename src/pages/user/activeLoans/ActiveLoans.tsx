import React from 'react'
import { IonPage, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import ProviderServices from './../../../providerServices/index'
import TextMaxSize from '../../../components/general/textMaxSize/TextMaxSize';

import HOSTS from './../../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default class ActiveLoans extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      activeLoans: [],
      isLoading: false,
      errorMessage: ''
    }
  }

  componentDidMount() {
    this.getActiveLoans()
  }

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp />
        {
          this.state.isLoading?
          (<ProgressBar style={{ "height": ".5em" }} animated now={100} variant="success" />):null
        }
        <IonContent>
          <div className="custom-bg-fluorescent-green text-light text-center py-2">
            Mis prestamos activos
          </div>
          {
            this.state.activeLoans.length?
            (this.state.activeLoans.map((item: any, index: any) => {
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
  getActiveLoans = () => {
    this.setState({
      activeLoans: [],
      isLoading: true,
      errorMessage: ""
    })
    services.getActiveLoans().then((res:any) => {
      this.setState({
        activeLoans: res,
        isLoading: false,
        errorMessage: ""
      })
    }).catch((err:any) => {
      this.setState({
        ActiveLoans: [],
        isLoading: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }
}