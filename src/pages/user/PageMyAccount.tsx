import React from 'react'
import { IonPage, IonContent, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import { 
  heart, 
  bookmark, 
  wallet,
  calendarOutline,
  personCircleOutline,
  atCircleOutline,
  fingerPrintOutline
 } from 'ionicons/icons';
import HeaderBiblioapp from '../../components/general/headerBiblioapp/HeaderBiblioapp'
import './PageMyAccount.css'
import ProviderServices from './../../providerServices/index'
import HOSTS from './../../providerServices/hosts.js'

let services = new ProviderServices(HOSTS.CIRENE.HOST)


export default class PageMyAccount extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      userInfo: {},
      isLoading: false
    }
  }

  componentDidMount(){
    this.getUserInfo()
  }

  render(){
    let loadingTemplate, hasFine
    if (this.state.isLoading) {
      loadingTemplate = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
    }
    if (this.state.userInfo.multa_actual == undefined) {
      hasFine = ""
    }else{
      hasFine = this.state.userInfo.multa_actual == "0"?"Felicitaciones, no tiene multas":"Tiene multas actualmente"
    }
    return (
      <IonPage>
        <HeaderBiblioapp history={this.props.history} />
        {loadingTemplate}
        <IonContent>
          <IonList className="custom-border-color-green profileInformation pb-0">
            <IonItem>
              <IonIcon className="custom-text-green pr-1" icon={personCircleOutline} />
              <IonLabel>{this.state.userInfo.nombre}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon className="custom-text-green pr-1" icon={atCircleOutline} />
              <IonLabel>{this.state.userInfo.email}</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon className="custom-text-green pr-1" icon={fingerPrintOutline} />
              <IonLabel>{this.state.userInfo.identificacion}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                {hasFine}
              </IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonItem 
              onClick={() => {
                this.props.history.push({
                  pathname: '/account/wishList',
                  state: { refresh: true }
                })
              }}
            >
              <IonIcon className="custom-text-green pr-1" size="large" icon={heart} />
              <IonLabel>Mi lista de deseos</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => {
                this.props.history.push({
                  pathname: '/account/activeLoans',
                  state: { refresh: true }
                })
              }}
            >
              <IonIcon className="custom-text-green pr-1" size="large" icon={bookmark} />
              <IonLabel>Mis prestamos activos</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => {
                this.props.history.push({
                  pathname: '/account/loanHistory',
                  state: { refresh: true }
                })
              }}
            >
              <IonIcon className="custom-text-green pr-1" size="large" icon={wallet} />
              <IonLabel>Mi historial de prestamos</IonLabel>
            </IonItem>
            <IonItem
              onClick={() => {
                this.props.history.push({
                  pathname: '/account/myReservations',
                  state: { refresh: true }
                })
              }}
            >
              <IonIcon className="custom-text-green pr-1" size="large" icon={calendarOutline} />
              <IonLabel>Mis reservas</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    )
  }

  getUserInfo = () => {
    this.setState({
      userInfo: {},
      isLoading: true
    })
    services.getUserInfo().then(res => {
      this.setState({
        userInfo: res,
        isLoading: false
      })
    }).catch(err => {
      this.setState({
        userInfo: {},
        isLoading: false
      })
      console.log(err);
    })
  }

}