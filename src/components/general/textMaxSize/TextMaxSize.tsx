import React, { useState } from 'react'
import { 
  arrowForwardCircleOutline,
  arrowBackCircleOutline
 } from 'ionicons/icons';
import {
  IonIcon
} from '@ionic/react';

export default (props: any) => {
  const text = props.text || ''
  const sizeDefault = parseInt(props.sizeDefault) || 49
  const labelVisible = props.labelVisible !== undefined?props.labelVisible:true
  const [textSize, setTextSize] = useState(sizeDefault)
  let seeMore, points

  if (text.length > sizeDefault + 1 && sizeDefault === textSize) {
    if (labelVisible) {
      seeMore = <span onClick={(e) => {
        e.stopPropagation()
        setTextSize(text.length)
      }}><IonIcon slot="start" icon={arrowForwardCircleOutline} /></span>
    }
    points = '...'
  }else if (text.length > sizeDefault + 1 && text.length == textSize) {
    seeMore = <span onClick={(e) => {
      e.stopPropagation()
      setTextSize(sizeDefault)
    }}><IonIcon slot="start" icon={arrowBackCircleOutline} /></span>
  }

  return (
    <span>
      {text.toString().substring(0, textSize)}
      {points}
      <span className="custom-text-green font-weight-bold">
        {seeMore}
      </span>
    </span>
  )
}