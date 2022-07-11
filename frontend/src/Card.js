import React from 'react'
import "./UploadImage.css"

function Card(props) {
  return (
    <div  className='uploadImage__box'>{props.children}</div>
  )
}

export default Card