import React from 'react'
import { Link } from 'react-router-dom';
import { 
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardContent, 
  IonImg
} from '@ionic/react';
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import HOSTS from './../../../../providerServices/hosts.js'
import ProviderServices from './../../../../providerServices/index'

export default class PageLibraries extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      libraries: [],
      librariesCustomDesign: [{
        "id": 1,
        "name": "Biblioteca Carlos Gaviria Díaz",
        "image": "https://s3.eu-west-1.amazonaws.com/genial.ly/5ca4faaf0adf672ea5bc8dee/1eb05b6d-b556-43fc-b4f7-5cb81b6d7793.jpeg",
        url: '/turnos/libraries/carlosGaviria'
      }]
    }
  }

  componentDidMount(){
    let providerServices = new ProviderServices(HOSTS.TURNOS.HOST)
    providerServices.getModel(`/listarsalas.php`).then((res:any) => {
      let arr = []
      if (Array.isArray(res.data)) {
        for (const iterator of res.data) {
          if (iterator.nombreBiblioteca !== 'Biblioteca Carlos Gaviria Díaz') {
            arr.push(iterator)
          }
        }
      }
      this.setState({
        libraries: arr
      })
    }).catch((err:any) => {
      console.log(err);
    })
  }

  render(){
    return (
      <IonPage>
        <HeaderBiblioapp history={this.props.history} />
        <IonContent>
          {
            this.state.librariesCustomDesign.map((library:any, index:any) => {
              return (
                <IonCard key={index} routerLink={library.url} >
                  <IonCardHeader>
                    <IonImg src={library.image} />
                    <div className="custom-bg-fluorescent-green pt-2" />
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="text-center">
                      <span className="font-weight-bold">{library.name}</span>
                    </div>
                  </IonCardContent>
                </IonCard>
              )
            })
          }
          {
            this.state.libraries.map((library:any, index:any) => {
              return (
                <Link
                  key={index}
                  to={{
                    pathname: "/turnos/libraries/defoultLibrary",
                    state: {
                      library: library.nombreBiblioteca,
                      room: library.ubicacion,
                      roomId: library.idSala,
                      currentLocation: library.ubicacion
                    }
                  }}
                  className="text-decoration-none"
                >
                <IonCard>
                  <IonCardHeader>
                    <div className="custom-bg-fluorescent-green pt-2" />
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="d-flex flex-column">
                      <span className="font-weight-bold text-center">{library.nombreBiblioteca}</span>
                      <span>{library.ubicacion}</span>
                    </div>
                  </IonCardContent>
                </IonCard>
                </Link>
              )
            })
          }
        </IonContent>
      </IonPage>
    )
  }
}