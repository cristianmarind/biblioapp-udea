import React, { useState, useEffect } from 'react'
import TextMaxSize from "./../general/textMaxSize/TextMaxSize"
import MaterialCard from './../../components/lobby/MaterialCard'
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
} from '@ionic/react';
import { 
  Tabs,
  Tab
} from 'react-bootstrap';
import ProviderServices from './../../providerServices/index'
import HOSTS from './../../providerServices/hosts.js'
let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default (props:any) => {
  const [recommendationsByAuthors, setRecommendationsByAuthors] = useState<any>([])
  const [recommendationsByUser, setRecommendationsByUser] = useState<any>([])
  const [recommendationsByNews, setRecommendationsByNews] = useState<any>([])

  useEffect(() => {
    getRecommendations()
  }, [/*props.location.state*/])

  const getRecommendations = () => {
    services.getRecommendations().then(res => {
      setRecommendationsByAuthors(res.authors)
      setRecommendationsByUser(res.user)
      setRecommendationsByNews(res.news)
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div className="d-flex flex-column">
      <div className="pl-2 pb-3">
        <span className="custom-text-green font-weight-bold">Recomendaciones</span>
      </div>
      <div>
        <Tabs id="uncontrolled-tab-example">
        {
            recommendationsByUser.length > 0?
            (
              <Tab eventKey="forYou" title="Para ti">
                <IonGrid className="p-0">
                  <IonRow>
                    {
                      recommendationsByUser.map((item:any, index:any) => {
                        return (
                          <IonCol key={index} size="6" className="p-0 my-2">
                            <MaterialCard 
                              title={item.titulo} 
                              image={item.image_url} 
                              autores={item.autores} 
                              isbn={item.isbn}
                              count={item.ejemplares}
                              description={item.padre}
                              titleno={item.titleno}
                            />
                          </IonCol>
                        )
                      })
                    }
                  </IonRow>
                </IonGrid>
              </Tab>
            ):null
          }
          {
            recommendationsByNews.length > 0?
            (
              <Tab eventKey="recent" title="Reciente">
                <IonGrid className="p-0">
                  <IonRow>
                    {
                      recommendationsByNews.map((item:any, index:any) => {
                        return (
                          <IonCol key={index} size="6" className="p-0 my-2">
                            <MaterialCard 
                              title={item.titulo} 
                              image={item.image_url} 
                              autores={item.autores} 
                              isbn={item.isbn}
                              count={item.ejemplares}
                              description={item.padre}
                              titleno={item.titleno}
                            />
                          </IonCol>
                        )
                      })
                    }
                  </IonRow>
                </IonGrid>
              </Tab>
            ):null
          }
          {
            recommendationsByAuthors.length > 0?
            (
              <Tab eventKey="authors" title="Autores">
                <IonGrid className="p-0">
                  <IonRow>
                    {
                      recommendationsByAuthors.map((item:any, index:any) => {
                        return (
                          <IonCol key={index} size="12" className="p-0 my-1">
                            <MaterialCard 
                              className="h-100"
                              title={item.titulo} 
                              image={item.image_url} 
                              autores={item.autores} 
                              isbn={item.isbn}
                              count={item.ejemplares}
                              description={item.padre}
                              titleno={item.titleno}
                              MaterialCardMode="1"
                            />
                          </IonCol>
                        )
                      })
                    }
                  </IonRow>
                </IonGrid>
              </Tab>
            ):null
          }
        </Tabs>
      </div>
    </div>
  )
}