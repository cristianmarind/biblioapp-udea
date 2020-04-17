import React, { useState } from 'react'

export default (props: any) => {
  const text = props.text || ''
  const sizeDefault = parseInt(props.sizeDefault) || 49
  const label = props.label || 'ver mas'
  const labelVisible = props.labelVisible !== undefined?props.labelVisible:true
  const [textSize, setTextSize] = useState(sizeDefault)
  let seeMore, points

  if (text.length > sizeDefault + 1 && sizeDefault === textSize) {
    if (labelVisible) {
      seeMore = <span style={{
        fontSize: 'small',
        textDecoration: 'underline'
      }} onClick={(e) => {
        e.stopPropagation()
        setTextSize(text.length)
      }}>{label}</span>
    }
    points = '...'
  }

  return (
    <span>
      {text.toString().substring(0, textSize)}
      {points}
      <br />
      {seeMore}
    </span>
  )
}