// <<<<<<< HEAD:src/Components/Body/Body.jsx
/* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useState } from "react";
// =======
import React, { useState, useEffect } from "react";
// >>>>>>> ced8f7b19a1e5d5444d6ab4c70804b597e055422:frontend/src/Components/Body/Body.jsx
import "./body.css";
// import pfp from "../../images/agri.jpg"
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
  const [, setImages] = useState([{}]);
  const [, setStatus] = useState("");
  const [btn, setBtn] = useState(false);
  const [scroll, setScroll] = useState(false);

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
        console.log(response);
        setStatus(response.data.message, "success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error while uploading image to server");
      });
    setScroll(true);
  };

  const getImages = () => {
    axios
      .get(api + "/images")
      .then((response) => {
        console.log(response);
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="body-up">
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
            <img className="img-prev" src={file} alt="image preview" />
          </div>
          {/* {
          btn &&  */}
          <button
            onClick={saveImage}
            className={`${"submit-link"} ${btn && "display"}`}
          >
            Submit
          </button>
          {/* <Link className="links" style={{textDecoration:"none"}} to="/ajhu"></Link> */}
          {/* } */}
        </div>
        <hr />
        <div className="rightup">
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
          {scroll && (
            <div className="body-down">
              <h1>
                {" "}
                Essay topics in English can be difficult to come up with. While
                writing essays, many college and high school students face
                writer’s block and have a hard time to think about topics and
                ideas for an essay. In this article, we will list out many good
                essay topics from different categories like argumentative
                essays, essays on technology, environment essays for students
                from 5th, 6th, 7th, 8th grades. Following list of essay topics
                are for all – from kids to college students. We have the largest
                collection of essays. An essay is nothing but a piece of content
                which is written from the perception of writer or author. Essays
                are similar to a story, pamphlet, thesis, etc. The best thing
                about Essay is you can use any type of language – formal or
                informal. It can biography, the autobiography of anyone.
                Following is a great list of 100 essay topics. We will be adding
                400 more soon!
              </h1>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Body;
