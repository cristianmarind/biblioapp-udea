import React from 'react'
import { IonItem, IonIcon, IonLabel, IonMenuToggle, IonList, IonImg } from '@ionic/react';
import { 
  arrowUp,
  arrowDown 
} from 'ionicons/icons';
import './SubMenu.css';

export default class SubMenu extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      isActive: !props.hidden
    };
  }

  render() {
    let subMenu = <div className="d-none"></div>
    let iconSubMenu = <IonIcon size="small" slot="end" color="white" icon={arrowUp} />
    if (this.state.isActive) {
      iconSubMenu = <IonIcon size="small" slot="end" color="white" icon={arrowDown} />
      subMenu = <div>
        {this.props.appPages.map((appPage: any, index: any) => {
          if (appPage.urls) {
            return (
              <SubMenu 
                key={index} 
                appPages={appPage.urls} 
                title={appPage.title} 
                icon={appPage.icon} 
                isSecundary={true}
                hidden={true} />
            );
          } else {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem 
                  className="itemMenu bg-transparent text-light"
                  routerLink={appPage.url} 
                  routerDirection="none" 
                  lines="none" 
                  detail={false}
                >
                  <div className="custom-icon mr-2">
                    <IonImg src={appPage.icon} />
                  </div>
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          }
        })}
      </div>
    }
    return (
        <IonItem className="itemMenu bg-transparent text-light">
            <IonList className="py-0 bg-transparent" lines="none">
              <IonItem 
                className={this.props.title?"itemMenu bg-transparent text-light":"d-none"}
                onClick={() => { this.setState({ isActive: !this.state.isActive }) }} 
                lines="none" 
                detail={false}
              >
                <div className="custom-icon mr-2">
                  <IonImg src={this.props.icon?this.props.icon:''} />
                </div>
                <IonLabel>{this.props.title}</IonLabel>
                {iconSubMenu}
              </IonItem>
              <div className={this.props.isSecundary?'secundaryItem':''}>
                {subMenu}
              </div>
              
            </IonList>
        </IonItem>
    )
  }
}