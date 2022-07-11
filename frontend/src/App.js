import React from 'react'

import UploadImage from './UploadImage';
import { useState } from 'react';
import "./App.css"
import ResponseCard from './ResponseCard';

function App() {
  const [showResult, setShowResult] = useState(false)
  const [url, setUrl] = useState('')


  const uploadedImage =(url)  => {
    setUrl(url)
 
    setShowResult(true)
  }

  

  return (<div className='container'>
     {showResult ?<ResponseCard url={url} /> :<UploadImage uploadedImage={uploadedImage}/>}
     <footer>created by <strong><u>Alemantrix</u></strong></footer>
  </div>
   
  )
}

export default App

