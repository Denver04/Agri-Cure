import { useState , useRef } from "react";
import "./body.css";
import ajhu from "../../images/pfp.png";
import demo1 from "../../images/demo1.jpg";
import demo2 from "../../images/demo2.jpg";
import demo3 from "../../images/demo3.jpg";
import panda from "../../images/panda.jpg";
import { motion } from "framer-motion";
import { ColorRing } from "react-loader-spinner"
import axios from "axios";
import { data } from "../Data/data.js"
import { information } from "../Data/Information"
// import res from "express/lib/response";

function Body() {

  const ref = useRef();
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

  const [ json ] = useState(data);
  const [ disease ] = useState(information)
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
  });
  const [predictshow , setPredictShow] = useState(true);
  const [loading , setLoading] = useState(true);
  const [isImage , setIsImage] = useState(false);
  const [display , setDisplay] = useState(false);

  const imageBtn = (e) => {
    setShow(false);
    // setMsg("");
    if(e.target.files[0] === undefined){
      setBtn(false);
      setFile(ajhu);
      setDisplay(false);
      // setIsImage(false);
    }
    else{
      const lastpart = (e.target.files[0]).name.split(".").pop();
      const lower_last = lastpart.toLowerCase();
      if(lower_last === "jpg" || lower_last === "jpeg" || lower_last === "png" || lower_last === "webp"){
        setIsImage(true);
        setDisplay(false);
        setFile(URL.createObjectURL(e.target.files[0]));
        setBtn(true);
      }
      else{
        setIsImage(false);
        setDisplay(true);
        setFile(panda);
      }
      // setIsImage(true);
    }
    setImageName(e.target.files[0]);
  };

  let api = "http://localhost:8000/upload-image";

  const saveImage = () => {
    setLoading(false);
    // setDis(false);
    let formData = new FormData();
    // console.log(imageName);
    formData.append('meimage', imageName);

    // console.log(formData);
    axios.post(api, formData)
      .then((response) => {
      const path = `/src/saves/${response.data["image"]}`;
      // setFile(path);
      
      const value = parseInt(response.data["number"]);
      const disease_name = json[value];
        // console.log(disease_name);
        if(value <= 61){
          setFile(path);
          setMsg("Result");
          setPredictShow(true);
          setPrediction({
            Name: disease_name,
            Symptoms: disease[disease_name].Symptoms,
            Causes: disease[disease_name].Causes,
            Cure: disease[disease_name].Cure,
          })
        }
        else if(value === 62){
          setPredictShow(false);
          setMsg(disease_name);
        }
        else{
          setFile(path);
          setPredictShow(false);
          setMsg(disease_name);
        }
        // setStatus(response.data.message, "success");
        nav.current.scrollIntoView();
        setLoading(true);
      })
      .catch((error) => {
        // console.log(photo);
        console.log(error);
        setStatus("Error while uploading image to server");
      });
    setShow(true);
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
          <form className="inputs" id="form" ref={ref}>
            <input
              className="input-file"
              type="file"
              onChange={imageBtn}
              accept="image/jpeg, image/png, image/jpg"
              required
              name="meimage"
            />
          </form>
          <div className="image">
            <img className="img-prev" src={file} alt="preview of upload" />
          </div>

          {
            !isImage && display ? 
            <p className="alert">Please upload an image</p>
            :
            <>
            {
              loading ?
            <button
              onClick={saveImage}
              className={`${"submit-link"} ${btn && isImage && "display"}`}
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
            </>
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
