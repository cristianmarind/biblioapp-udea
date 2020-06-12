import React from 'react'
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonLabel,
  IonSelectOption
} from '@ionic/react';

export default class SearchFilter extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      nroHours: 1,
      hour: new Date(Date.now()).getHours()
    };
    this.applyFilter()
  }

  applyFilter(){
    let currentDate =  new Date(Date.now())
    let horasReserva = [
      {
        horaInicioReserva: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${this.state.hour}:0:0`,
        horaFinReserva: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${parseInt(this.state.hour) + 1}:0:0`
      }
    ]
    if (this.state.nroHours === 2) {
      horasReserva.push({
        horaInicioReserva: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${parseInt(this.state.hour) + 1}:0:0`,
        horaFinReserva: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} ${parseInt(this.state.hour) + 2}:0:0`
      })
    }
    this.props.applyFilter({
      filter: this.state,
      horasReserva: horasReserva
    })
  }

  render() {
    //let currentDate =  new Date(Date.now())
    let hours = []
    for (let index = new Date(Date.now()).getHours(); index <= 20; index++) {
      hours.push(index)
    }
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <div className="custom-bg-green text-light w-100 py-1 text-center">
              <IonLabel>Número de horas</IonLabel>
            </div>
            <IonSelect 
              value={this.state.nroHours} 
              onIonChange={(e) => {
                this.setState({nroHours: e.detail.value})
                this.applyFilter()
              }}  
            >
              <IonSelectOption value={1}>1</IonSelectOption>
              <IonSelectOption value={2}>2</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol>
            <div className="custom-bg-green text-light w-100 py-1 text-center">
              <IonLabel className="custom-bg-green text-light">Hora inicial</IonLabel>
            </div>
            <IonSelect 
              value={this.state.hour} 
              onIonChange={(e) => {
                this.setState({hour: e.detail.value})
                this.applyFilter()
              }}  
            >
              {
                hours.map((hour) => {
                  return (
                  <IonSelectOption key={hour} value={hour}>{hour}</IonSelectOption>
                  )
                })
              }
            </IonSelect>
          </IonCol>
        </IonRow>
      </IonGrid>
    )
  }
}