import React, { useState } from "react";
import "./body.css";
import ajhu from "../../images/pfp.png";
import demo1 from "../../images/demo1.jpg";
import demo2 from "../../images/demo2.jpg";
import demo3 from "../../images/demo3.jpg";
import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
import axios from "axios";

function Body() {
  const bodyvariants = {
    hidden: {
      x: "90vw",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.3, stiffness: 50, type: "spring", duration: 0.3 },
    },
    exit: {
      y: "-100vh",
      transition: { ease: "linear" },
    },
  };

  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState(ajhu);
  const [, setStatus] = useState("");
  const [btn, setBtn] = useState(false);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [prediction, setPrediction] = useState({
    Causes: "",
    Cure: "",
    Symptoms: "",
  });

  let api = "http://127.0.0.1:8000/api";

  const saveImage = (e) => {
    console.log("saveImage");
    let formData = new FormData();
    formData.append("image", imageName);

    let axioConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    console.log(formData);
    axios
      .post(api + "/images/", formData, axioConfig)
      .then((response) => {
        console.log(response.data);
        setMsg(response.data.prediction[0]);
        console.log(response.data.prediction[1].Cure);
        setPrediction({
          Causes: response.data.prediction[1].Causes,
          Cure: response.data.prediction[1].Cure,
          Symptoms: response.data.prediction[1].Symptoms,
        });
        setStatus(response.data.message, "success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error while uploading image to server");
      });
    setShow(true);
    window.scrollTo(0, 1000);
  };

  const imageBtn = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setBtn(true);
    setImageName(e.target.files[0]);
  };

  return (
    <motion.div
      variants={bodyvariants}
      className="body"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="body-left">
        <div className="leftbody">
          <h1>Upload your file</h1>
          <form className="inputs">
            <input
              className="input-file"
              type="file"
              onChange={imageBtn}
              accept="image/*"
              required
            />
            {/* <input type="submit" className="submit" value="Submit" /> */}
          </form>
          <div className="image">
            <img className="img-prev" src={file} alt="preview of upload" />
          </div>
          {/* {
          btn &&  */}
          <button
            onClick={saveImage}
            className={`${"submit-link"} ${btn && "display"}`}
          >
            Submit
          </button>
          {/* } */}
        </div>
        <hr />
        <div className="rightbody">
          <h1>Instructions:</h1>
          <div className="demo">
            <figure className="demo-fig">
              <img className="demo-img" src={demo1} alt="visibility" />
              <figcaption>
                Affected part of the leaf should be visible
              </figcaption>
            </figure>
            <figure className="demo-fig">
              <img className="demo-img" src={demo2} alt="quality" />
              <figcaption>Photo quality should be decent</figcaption>
            </figure>
            <figure className="demo-fig">
              <img className="demo-img" src={demo3} alt="clear bg" />
              <figcaption>
                Leaf should be differentiable from the background
              </figcaption>
            </figure>
            <iframe
              title="YT link"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="body-right">
        {show && (
          <div className="resultfromcnn">
            <h1>Result</h1>
            <div className="resultname">
              <p><span>Name:</span> {msg}</p>
            </div>
            <div className="resultcause">
              <p><span>Causes:</span> {prediction.Causes}
            </p>
            </div>
            <div className="resultsymptom">
              <p><span>Symptoms:</span> {prediction.Symptoms}
            </p>
            </div>
            <div className="resultcure">
              <p><span>Cure:</span> {prediction.Cure}
            </p>
            </div>
          </div>
        )} 
      </div>
    </motion.div>
  );
}

export default Body;
