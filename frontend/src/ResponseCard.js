import React from "react";
import Card from "./Card";
import Checked from "./checked.png";
import "./ResponseCard.css";

function ResponseCard(props) {
  let url = props.url;
  const inputRef = React.useRef()

  React.useEffect(() => {

    if(url.length && url.length > 22){
      inputRef.current.value = url.substr(0, 20) + "..."
      
    }else {

      inputRef.current.value = url
    }
    // navigator.clipboard.writeText(url);

  }, [])

  function copyHandler() {
    navigator.clipboard.writeText(url);
  }


  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "http://" + url;
  }

  return (
    <Card >
  

        <img src={Checked} id="check" />

      <p>Uploaded Successfully!</p>
      <img src={url} id="resultImage" />
      {/* <p>{url}</p> */}
      <div className="responsiveCard__input">
        <input type="text" ref={inputRef}/>
      <input type="submit" value="Copy" className="submit__button" onClick={copyHandler}/>
      </div>
      
    
      
    </Card>
  );
}

export default ResponseCard;
