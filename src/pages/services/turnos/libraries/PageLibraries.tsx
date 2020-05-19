import React from 'react'
import { Link } from 'react-router-dom';
import { 
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardContent, 
  IonImg,
  IonTitle,
  IonCardSubtitle
} from '@ionic/react';
import HeaderBiblioapp from '../../../../components/general/headerBiblioapp/HeaderBiblioapp'
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
    let providerServices = new ProviderServices('https://cors-anywhere.herokuapp.com/http://biblioteca.udea.edu.co/turnos/services')
    providerServices.getModel(`/listarsalas.php`).then((res:any) => {
      let arr = []
      for (const iterator of res.data) {
        if (iterator.nombreBiblioteca !== 'Biblioteca Carlos Gaviria Díaz') {
          arr.push(iterator)
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
        <HeaderBiblioapp />
        <IonContent>
          <div className="custom-bg-fluorescent-green text-light text-center py-2">
            Reserva de equipos
          </div>
          {
            this.state.librariesCustomDesign.map((library:any, index:any) => {
              return (
                <IonCard key={index} routerLink={library.url} >
                  <IonCardHeader>
                    <IonImg src={library.image} />
                    <div className="custom-bg-fluorescent-green pt-2" />
                  </IonCardHeader>
                  <IonCardContent>
                    <IonTitle>{library.name}</IonTitle>
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
                    <IonTitle>{library.nombreBiblioteca}</IonTitle>
                    <IonCardSubtitle>{library.ubicacion}</IonCardSubtitle>
                  </IonCardHeader>
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