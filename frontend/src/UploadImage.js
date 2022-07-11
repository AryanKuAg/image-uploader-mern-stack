import React from "react";
import "./UploadImage.css";
import axiosInstance from "./axios";
import placeholderImage from "./image-placeholder.png";
import Card from "./Card";
import CustomizedProgressBars from './LinearProgress';



function UploadImage(props) {
  const [style, setStyle] = React.useState({ backgroundColor: "white" });
  const [imgStyle, setImgStyle] = React.useState({ height: "50px" });
  const [showProgress, setShowProgress] = React.useState(false)
  const [progress, setProgress] = React.useState(20)
  const inputRef = React.useRef();

  // React.useEffect(() => {
  //   console.log(inputRef.current)
  // }, [inputRef])

  window.addEventListener("dragover", function (e) {
    e = e;
    e.preventDefault();
  });
  window.addEventListener("drop", function (e) {
    e.preventDefault();
  });
  const submitHandler = async (event) => {
    // event.preventDefault();
    setShowProgress(true)
    let myInterval = setInterval(() =>{
      setProgress(pre => {
        if(pre < 100){
          return 5 + pre;
        }else{
          return pre;
        }
      })
    }, 500);


    const formData = new FormData();
    const image = document.querySelector("#imageInput");

    // console.log("formData", image.files[0]);
    if (!image.files.length) {
      // console.log("no image found!");
      return;
    } 
    formData.append("picture", image.files[0]);

    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setProgress(100)
    clearInterval(myInterval); //stop that interval

    
    
    
    // Time to change the ui
    props.uploadedImage(response.data)
    // console.log(response);
  };

  const chooseFileHandler = (event) => {
    event.preventDefault();
    const fileUploadInputElement = document.querySelector("#imageInput");

    if (fileUploadInputElement) {
      fileUploadInputElement.click();
    }

    // submitHandler()
  };

  // const uploadArea = document.querySelector(".uploadImage__borderBox")
  // if(uploadArea){

  //    uploadArea.addEventListener('drop', (e) => {
  //   console.log(e)
  // })
  // }else{
  //   console.log('nothing')
  // }

  return (
    <form>
      {showProgress? <CustomizedProgressBars value={progress}/>:
      <Card>
        <h2>Upload your image</h2>
        <p>File should be Jpeg, Png...</p>
        <div
          style={style}
          className="uploadImage__borderBox"
          onDragEnter={() => {
            setStyle({ backgroundColor: "#F9F2ED" });
            setImgStyle({ height: "60px" });
          }}
          onDragLeave={() => {
            setStyle({ backgroundColor: "white" });
            setImgStyle({ height: "50px" });
          }}
          onDrop={(e) => {
            let dt = e.dataTransfer;
            let files = dt.files;

            // const fileUploadInputElement =
            //   document.querySelector("#imageInput");
            // fileUploadInputElement.files = files;

            //  console.log(fileUploadInputElement.files)
            //  console.log(inputRef.current.files, 'haha')
            // console.log(files)

            inputRef.current.files = files;
            submitHandler()
          }}
        >
          <img style={imgStyle} src={placeholderImage} id="placeholder" />
          <p id="img__inner__text">Drag & Drop your image here</p>
        </div>
        <p>Or</p>
        <button className="chooseFile" onClick={chooseFileHandler}>
          Choose a file
        </button>
        <input
          type="file"
          id="imageInput"
          ref={inputRef}
          onChange={submitHandler}
        />
      </Card>}
    </form>
  );
}

export default UploadImage;

//  <form onSubmit={submitHandler}>
// <input type="file" id='imageInput' />
//   <button type='submit'>Submit</button>
// </form>
