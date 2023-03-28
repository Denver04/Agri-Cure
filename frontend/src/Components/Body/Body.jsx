import React, { useState , useRef , useEffect } from "react";
import "./body.css";
import ajhu from "../../images/pfp.png";
import demo1 from "../../images/demo1.jpg";
import demo2 from "../../images/demo2.jpg";
import demo3 from "../../images/demo3.jpg";
import { motion } from "framer-motion";
import { ColorRing } from "react-loader-spinner"
import axios from "axios";


function Body() {
  const nav = useRef();
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
    Name: "",
    Causes: "",
    Cure: "",
    Symptoms: "",
    random: "",
  });
  const [error , setError] = useState("");
  const [predictshow , setPredictShow] = useState(true);
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    // return () => {
      nav.current.scrollIntoView();
    // };
  }, [prediction.random , error]);

  let api = "http://127.0.0.1:8000/api";

  const saveImage = (e) => {
    setLoading(false);
    // console.log("saveImage");
    let formData = new FormData();
    formData.append("image", imageName);

    let axioConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    // console.log(formData);
    axios
      .post(api + "/images/", formData, axioConfig)
      .then((response) => {
        // console.log(typeof(response.data.prediction));
        // setMsg(response.data.prediction[0]);
        const len = Object.keys(response.data.prediction).length;
        // console.log(Object.keys(response.data.prediction).length);
        if(len === 3){
          setMsg("Result");
          setPredictShow(true);
          setPrediction({
            Name: response.data.prediction[0],
            Causes: response.data.prediction[1].Causes,
            Cure: response.data.prediction[1].Cure,
            Symptoms: response.data.prediction[1].Symptoms,
            random: response.data.prediction[2],
          })
        }
        else{
          setPredictShow(false);
          setError(response.data.prediction[1]);
          setMsg(response.data.prediction[0]);
        }
        // setPrediction({
        //   Causes: response.data.prediction[1].Causes,
        //   Cure: response.data.prediction[1].Cure,
        //   Symptoms: response.data.prediction[1].Symptoms,
        // })
        // .then(() => {
        //   setShow(true);
        //   nav.current.scrollIntoView();
        // });
        setStatus(response.data.message, "success");
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error while uploading image to server");
      });
    // setLoading(true);
    setShow(true);
    // setDis(true);
    // window.scrollTo(0,1000);
  };

  const imageBtn = (e) => {
    setShow(false);
    // setMsg("");
    if(e.target.files[0] === undefined){
      setBtn(false);
      setFile(ajhu);
    }
    else{
      setFile(URL.createObjectURL(e.target.files[0]));
      setBtn(true);
    }
    // console.log((e.target.files[0]));
    // setFile(URL.createObjectURL(e.target.files[0]));
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
          {
            loading ? <button
            onClick={saveImage}
            className={`${"submit-link"} ${btn && "display"}`}
            // disabled={dis}
          >
            Submit
          </button> : 
          <div className="load">
          <ColorRing
            visible={true}
            height="70"
            width="70"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['var(--h1)', 'var(--h1)', 'var(--h1)', 'var(--h1)', 'var(--h1)' , "var(--h1)" ]}
          />
          </div>
          }
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
                Leaf should be single/differentiable from the background
              </figcaption>
            </figure>
            <div className="iframe">
            <iframe
              title="YT link"
              src="https://youtube.com/embed/bieZ8k_s204"></iframe>
              <p className="figcaption">Watch the video for detailed instructions</p>
            </div>
          </div>
        </div>
      </div>
      <div className="body-right" ref={nav}>
        {show && (
          <div className="resultfromcnn" id="result">
            <h1>{msg}</h1>
            {
              predictshow &&
              <>
              <div className="resultname">
                <p><span>Name:</span> {prediction.Name}</p>
              </div>
              <div className="resultcause">
                <p><span>Causes:</span> {prediction.Causes}</p>
              </div>
              <div className="resultsymptom">
                <p><span>Symptoms:</span> {prediction.Symptoms}</p>
              </div>
              <div className="resultcure">
                <p><span>Cure:</span> {prediction.Cure}</p>
              </div>
              </>
            }
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Body;
