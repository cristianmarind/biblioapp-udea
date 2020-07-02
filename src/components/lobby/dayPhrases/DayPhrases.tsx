import React, { useState, useEffect } from 'react'
//import TextMaxSize from "./../general/textMaxSize/TextMaxSize"
import {
} from '@ionic/react';
import {
  Modal,
} from 'react-bootstrap';
import ProviderServices from '../../../providerServices/index'
import HOSTS from '../../../providerServices/hosts.js'
import './dayPhrases.scss';


let services = new ProviderServices(HOSTS.CIRENE.HOST)

export default (props: any) => {
  const [dayPhrases, setDayPhrases] = useState<any>([])
  const [isOpen, setIsOpen] = useState<any>(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<any>(0)

  useEffect(() => {
    getDayPhrases()
  }, [/*props.location.state*/])

  const getDayPhrases = () => {
    services.getModel('/programador/services/listarHistoriasPorDia.php', null).then(res => {
      setDayPhrases(res.data)
      console.log(res.data);

    })
  }

  return (
    <div className="">
      <div className="px-2">
        {
          dayPhrases.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-center align-items-center m-1"
                style={{
                  width: "2.5em",
                  height: "2.5em",
                  backgroundColor: item.background_color,
                  color: item.text_color,
                  borderRadius: "50%",
                  float: "left"
                }}
                onClick={() => {
                  setIsOpen(true)
                  setCurrentPhraseIndex(index)
                }}
              >
                {item.phrase.charAt(0).toUpperCase()}
              </div>
            )
          })
        }
      </div>
      <Modal
        id="dayPhrasesModal"
        show={isOpen}
        onHide={() => { setIsOpen(false) }}
        style={{
          backgroundColor: dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].background_color : "#fff"
        }}>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "transparent"
          }}
        />
        <Modal.Body>
          <div 
            className="d-flex flex-column"
          >
            <span 
              className="font-weight-normal mb-2"
              style={{
                color: dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].text_color : "#000"
              }}
            >
              {dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].phrase : ""}
            </span>
            <span 
              className="font-weight-lighter"
              style={{
                color: dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].text_color : "#000"
              }}
            >
              {dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].author : ""}
            </span>
            <div className="mt-5 text-center">
              <a
                className="font-weight-bold"
                href={dayPhrases[currentPhraseIndex]?(dayPhrases[currentPhraseIndex].titleno.toString().includes("http")?dayPhrases[currentPhraseIndex].titleno.toString():`http://aplicacionesbiblioteca.udea.edu.co/biblioApp/?titleno=${dayPhrases[currentPhraseIndex].titleno}`):"#"}
              >
                <span
                  style={{
                    color: dayPhrases[currentPhraseIndex] ? dayPhrases[currentPhraseIndex].text_color : "#000"
                  }}
                >
                  Ver título
                </span>
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}