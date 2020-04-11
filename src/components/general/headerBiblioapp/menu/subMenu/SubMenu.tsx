import React from 'react'
import { IonItem, IonIcon, IonLabel, IonMenuToggle, IonList } from '@ionic/react';
import './SubMenu.css';

export default class SubMenu extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isActive: !props.hidden
    };
  }

  render() {
    let b = <div className="d-none"></div>
    if (this.state.isActive) {
      b = <div>
        {this.props.appPages.map((appPage: any, index: any) => {
          if (appPage.urls) {
            return (
              <SubMenu 
                key={index} 
                appPages={appPage.urls} 
                title={appPage.title} 
                iosIcon={appPage.iosIcon} 
                isSecundary={true}
                hidden={true} />
            );
          } else {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className="itemMenu"
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                >
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          }
        })}
      </div>
    }
    return (
        <IonItem className="itemMenu">
            <IonList className="py-0" lines="none">
              <IonItem 
                className={this.props.title?"itemMenu":"d-none"}
                onClick={() => { this.setState({ isActive: !this.state.isActive }) }} 
                lines="none" 
                detail={false}
              >
                <IonIcon slot="start" icon={this.props.iosIcon?this.props.iosIcon:''} />
                <IonLabel>{this.props.title}</IonLabel>
              </IonItem>
              <div className={this.props.isSecundary?'secundaryItem':''}>
                {b}
              </div>
              
            </IonList>
        </IonItem>
    )
  }
}