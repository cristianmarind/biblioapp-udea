import React from 'react'
import { Link } from 'react-router-dom';
import { 
  IonPage, 
  IonContent, 
  IonTitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { Accordion, Card, Button } from 'react-bootstrap';
import HeaderBiblioapp from '../../../../../components/general/headerBiblioapp/HeaderBiblioapp'
import SearchFilter from './../../../../../components/turnos/searchFilter/SearchFilter'
import ProviderServices from './../../../../../providerServices/index'
import piso1 from './../../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/piso1.png'
import piso2 from './../../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/piso2.png'
import piso3 from './../../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/piso3.png'
import sala from './../../../../../assets/universidad/bibliotecas/CarlosGaviria/pisos/salas.png'
import './PageCarlosGaviria.css'

export default class PageCarlosGaviria extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      piso3: [],
      salaPatrimonial: [],
      piso2Oriental: [],
      piso2Occidental: [],
      piso2Central: [],
      plantaBaja: [],
      plantaBajaAudiovisuales: [],
      filter: {}
    };
  }

  applyFilter = async (filterObject: any) => {
    let providerServices = new ProviderServices('http://localhost/turnos/services')
    let filter = filterObject.filter
    let pcs:any = []
    await providerServices.postModel(`/ListarEquiposDisponiblesPorHora.php?horaConsulta=${filter.hour}`).then(res => {
      pcs = res.data
    }).catch((err) => {
      console.log(err);

      /*EventBus.$emit(
        "openMessage",
        "El problema es nuestro, intenta mas tarde.",
        "error"
      );*/
    })
    if (filter.nroHours === 2) {
      await providerServices.postModel(`/ListarEquiposDisponiblesPorHora.php?horaConsulta=${filter.hour + 1}`).then(res => {
        let resArray = []
        for (const filter1 of pcs) {
          for (const filter2 of res.data) {
            if (filter1.codComputador === filter2.codComputador) {
              resArray.push(filter1)
              break;
            }
          }
        }
        pcs = resArray
      }).catch((err) => {
        console.log(err);
        /*EventBus.$emit(
          "openMessage",
          "El problema es nuestro, intenta mas tarde.",
          "error"
        );*/
      })
    }
    this.refreshState(pcs, filterObject)
  }

  refreshState = (pcs:any, filterObject:any) => {
    let rooms = {
      piso3: [] as any,
      salaPatrimonial: [] as any,
      piso2Oriental: [] as any,
      piso2Occidental: [] as any,
      piso2Central: [] as any,
      plantaBaja: [] as any,
      plantaBajaAudiovisuales: [] as any,
      filter: filterObject
    }
    for (const pc of pcs) {
      switch (pc.nombreSala) {
        case "Piso 3 - Sector Central":
          rooms.piso3.push(pc);
          break;
        case "Sala patrimonial":
          rooms.salaPatrimonial.push(pc);
          break;
        case "Piso 2 - Costado Oriental":
          rooms.piso2Oriental.push(pc);
          break;
        case "Piso 2 - Costado Occidental":
          rooms.piso2Occidental.push(pc);
          break;
        case "Piso 2 - Sector Central ":
          rooms.piso2Central.push(pc);
          break;
        case "Planta Baja":
          rooms.plantaBaja.push(pc);
          break;
        case "Planta Baja - Audiovisuales":
          rooms.plantaBajaAudiovisuales.push(pc);
          break;
      }
    }
    this.setState(rooms)
  }

  render() {
    return (
      <IonPage>
        <HeaderBiblioapp />
        <IonContent>
          <IonTitle>PageCarlosGaviria</IonTitle>
          <SearchFilter applyFilter={this.applyFilter} />
          <div className="mb-2">
            <span>Selecciona la sala que deseas utilizar</span>
          </div>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className="py-0 border-0">
                <Accordion.Toggle className="w-100 py-0 position-relative" as={Button} variant="link" eventKey="0">
                  <IonImg src={piso3} />
                  <div className="labelPiso">PISO 3</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <IonGrid>
                    <IonRow>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.piso3,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.piso3.length} pcs
                          </span>
                        </Link>
                        
                      </IonCol>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.salaPatrimonial,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.salaPatrimonial.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="py-0 border-0">
                <Accordion.Toggle className="w-100 py-0 position-relative" as={Button} variant="link" eventKey="1">
                  <IonImg src={piso2} />
                  <div className="labelPiso">PISO 2</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <IonGrid>
                    <IonRow>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.piso2Oriental,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.piso2Oriental.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                      <IonCol className="position-relative">
                      <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.piso2Central,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.piso2Central.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.piso2Occidental,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.piso2Occidental.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="py-0 border-0">
                <Accordion.Toggle className="w-100 py-0 position-relative" as={Button} variant="link" eventKey="3">
                  <IonImg src={piso1} />
                  <div className="labelPiso">PISO 1</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <IonGrid>
                    <IonRow>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.plantaBaja,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.plantaBaja.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                      <IonCol className="position-relative">
                        <Link
                          to={{
                            pathname: "/turnos/Reservar",
                            state: {
                              pcs: this.state.plantaBajaAudiovisuales,
                              filter: this.state.filter
                            }
                          }}
                        >
                          <IonImg src={sala} />
                          <span className="position-absolute top-0 px-2 bg-light text-dark rounded">
                            {this.state.plantaBajaAudiovisuales.length} pcs
                          </span>
                        </Link>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </IonContent>
      </IonPage>
    )
  }
}