import React, { useState, useEffect } from "react";
import "./body.css"
// import pfp from "../../images/agri.jpg"
import ajhu from "../../images/pfp.png"
import demo1 from "../../images/demo1.jpg"
import demo2 from "../../images/demo2.jpg"
import demo3 from "../../images/demo3.jpg"
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from "axios";

function Body() {
  const bodyvariants={
    hidden:{
      x:"90vw",
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{delay:0.3 , stiffness:50 , type:"spring" , duration:0.3}
    },
    exit:{
      y:"-100vh",
      transition:{ease:"linear"}
    }
  }

  const[imageName, setImageName] = useState('');
  const [file , setFile] = useState(ajhu);
  const[images, setImages] = useState([{}]);
  const[status, setStatus] = useState('');

  let api = "http://127.0.0.1:8000/api";

  const saveImage = () => {
    console.log("saveImage");

    let formData = new FormData();
    formData.append('image', imageName);

    let axioConfig = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    console.log(formData);
    axios.post(api + '/images/', formData, axioConfig).then(
      response => {
        console.log(response);
        setStatus(response.data.message, "success");
      }
    ).catch(error => {
      console.log(error);
      setStatus("Error while uploading image to server");
    });
  }

  const getImages = () => {
    axios.get(api + '/images').then(
      response => {
        console.log(response);
        setImages(response.data);
      }
    ).catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    getImages();
  }, []);

  const imageBtn = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImageName(e.target.files[0]);
  };

  return (
    <motion.div 
    variants={bodyvariants}
    className='body'
    initial="hidden"
    animate="visible"
    exit="exit"
    >
      <div className="leftbody">
        <h1>Upload your file</h1>
        <form className="inputs">
          <input className="input-file" type="file" onChange={imageBtn} accept="image/*" />
          {/* <input type="submit" className="submit" value="Submit" /> */}
        </form>
        <div className="image">
          <img className="img-prev" src={file} />
        </div>
        <Link style={{textDecoration:"none"}} to="/ajhu"><button onClick={saveImage} className="submit-link">Submit</button></Link>
      </div>
      <hr />
      <div className="rightbody">
        <h1>Instructions:</h1>
        <div className="demo">
        <figure className="demo-fig">
          <img className="demo-img" src={demo1} alt="visibility" />
          <figcaption>Affected part of the leaf should be visible</figcaption>
        </figure>
        <figure className="demo-fig">
          <img className="demo-img" src={demo2} alt="quality" />
          <figcaption>Photo quality should be decent</figcaption>
        </figure>
        <figure className="demo-fig">
          <img className="demo-img" src={demo3} alt="clear bg" />
          <figcaption>Leaf should be differentiable from the background</figcaption>
        </figure>
        {/* <figure className="demo-fig">
          <img className="demo-img" src={demo4} alt="Trulli" />
          <figcaption>Background should be clear</figcaption>
        </figure> */}
        <iframe
          src="https://youtu.be/ek3XRY-Vew0">
        </iframe>
        </div>
      </div>
    </motion.div>
  )
}

export default Body