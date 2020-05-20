import React from 'react'
import { 
  trashOutline
 } from 'ionicons/icons';
import { IonPage, IonContent, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { ProgressBar } from 'react-bootstrap';
import HeaderBiblioapp from '../../../components/general/headerBiblioapp/HeaderBiblioapp'
import MaterialCard from './../../../components/lobby/MaterialCard'
import ProviderServices from './../../../providerServices/index'

let services = new ProviderServices('https://cors-anywhere.herokuapp.com/http://cirene.udea.edu.co')

export default class WishList extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      wishList: [],
      isLoading: false,
      needUpdate: false,
      errorMessage: '',
      deleteProcess: 0,
      currentItem: null
    }
  }

  componentDidMount(){
    this.getWishList()
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevState.needUpdate !== this.state.needUpdate && this.state.needUpdate) {
      this.getWishList()
    }
  }

  render() {
    let loadingTemplate
    if (this.state.isLoading) {
      loadingTemplate = <ProgressBar style={{"height": ".5em"}} animated now={100} variant="success" />
    }
    return (
      <IonPage>
        <HeaderBiblioapp />
        {loadingTemplate}
        <IonContent>
          <div className="custom-bg-fluorescent-green text-light text-center py-2">
            Mi lista de deseos
          </div>
          {
            this.state.wishList.length?
            (
              this.state.wishList.map((item:any, index:any) => {
                return (
                  <div key={index} className="position-relative"> 
                    <MaterialCard 
                      title={item.titulo} 
                      image={item.image_url} 
                      autores={item.autores} 
                      isbn={item.isbn}
                      count={item.ejemplares}
                      description={item.padre}
                      titleno={item.titleno}
                    />
                    <IonButton 
                      className="position-absolute"
                      style={{
                        bottom: '0',
                        right: '1em'
                      }}
                      color="danger"
                      onClick={() => { this.setState({deleteProcess: 1, currentItem: item.titleno }) }} 
                    >
                      <IonIcon size="small" icon={trashOutline} />
                    </IonButton>
                  </div>
                )
              })
            ):(<div className="text-center pt-3">{this.state.errorMessage}</div>)
          }

          <IonAlert
            isOpen={this.state.deleteProcess == 1}
            onDidDismiss={() => {this.setState({deleteProcess: 0})}}
            header={'BiblioApp'}
            message={'¿Esta seguro que desea eliminar el elemento de su lista de deseos?'}
            buttons={[
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary'
              },
              {
                text: 'Eliminar',
                cssClass: 'danger',
                handler: () => {
                  this.deleteWishListItem(this.state.currentItem)
                }
              }
            ]}
          />
          <IonAlert
            isOpen={this.state.deleteProcess == 2}
            onDidDismiss={() => this.setState({deleteProcess: 0})}
            header={'BiblioApp'}
            message={'Ha eliminado con éxito.'}
            buttons={[
              {
                text: 'Cerrar'
              }
            ]}
          />
          <IonAlert
            isOpen={this.state.deleteProcess == -1}
            onDidDismiss={() => this.setState({deleteProcess: 0})}
            header={'BiblioApp'}
            message="No se pudo eliminar el item de su lista de deseos"
            buttons={[
              {
                text: 'Cerrar'
              }
            ]}
          />
        </IonContent>
      </IonPage>
    )
  }

  deleteWishListItem = (titleno:any) => {
    this.setState({
      isLoading: true,
      needUpdate: false,
      deleteProcess: 0
    })
    services.deleteWishListItem(titleno).then(res => {
      this.setState({
        isLoading: false,
        needUpdate: true,
        deleteProcess: 2
      })
    }).catch(err => {
      this.setState({
        isLoading: false,
        needUpdate: false,
        deleteProcess: -1
      })
      console.log(err);
    })
  }

  getWishList = () => {
    this.setState({
      wishList: [],
      isLoading: true,
      needUpdate: false,
      errorMessage: ""
    })
    services.getWishList().then(res => {
      this.setState({
        wishList: res,
        isLoading: false,
        needUpdate: false,
        errorMessage: ""
      })
    }).catch(err => {
      this.setState({
        wishList: [],
        isLoading: false,
        needUpdate: false,
        errorMessage: err.msg.MSG
      })
      console.log(err);
    })
  }
}