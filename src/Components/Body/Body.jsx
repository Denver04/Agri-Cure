import React, { useState } from "react";
import "./body.css"
// import pfp from "../../images/agri.jpg"
import ajhu from "../../images/pfp.png"
import demo1 from "../../images/demo1.jpg"
import demo2 from "../../images/demo2.jpg"
import demo3 from "../../images/demo3.jpg"
import demo4 from "../../images/demo4.jpg"
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

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

  const [file, setFile] = useState(ajhu);
    function handleChange(e) {
      e.preventDefault();
        // console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
    }

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
        <div className="inputs">
          <input className="input-file" type="file" onChange={handleChange} accept="image/*" />
        </div>
        <div className="image">
          <img className="img-prev" src={file} />
        </div>
        <Link to="/ajhu" className="submit-link">Submit</Link>
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
          src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>
        </div>
      </div>
    </motion.div>
  )
}

export default Body