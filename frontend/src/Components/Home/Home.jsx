import "./home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import stat1 from "../../images/stat1.png";
import stat2 from "../../images/stat2.jpg";
import stat3 from "../../images/stat3.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  const containerVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.3, type: "spring", stiffness: 70 },
      // transition={{delay:0.7 , duration:1 , type:"spring"}}
    },
    exit: {
      y: "0vh",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="home-info">
        <h1 id="simple_arc" className="textomimage">
          GET THE CURE ...
        </h1>
        <p className="textomimage2">
          Welcome to our innovative agricultural website! We are revolutionizing
          the way farmers and agricultural professionals diagnose plant diseases
          by utilizing the power of machine learning. Our advanced ML model can
          detect the disease present in plants with just the image of an
          infected leaf, making it easier and faster for you to identify and
          treat the problem. With our technology, we aim to improve crop health
          and increase yields, ultimately contributing to a more sustainable and
          prosperous agricultural industry.
        </p>
        <Link to="/upload-image" className="btn-link">
          Get Started
        </Link>
      </div>

      <div className="body-info">
        <div className="body-info-img" data-aos="zoom-in">
          <img
            src={stat1}
            alt="undraw-healthy-lifestyle-6tyl"
            border="0"
            className="home-image"
          />
        </div>
        <div className="body-info-text">
          <h1>Impact on Economy ...</h1>
          <p>
            The agricultural sector in India and worldwide incurs annual losses
            of $12 billion and $220 billion, respectively. This leads to
            increment in price of the crops and also the farmers are not able to
            get the desired profit.
          </p>
        </div>
      </div>

      <div className="body-info odd">
        <div className="body-info-img" data-aos="zoom-in">
          <img
            src={stat2}
            alt="undraw-healthy-lifestyle-6tyl"
            border="0"
            className="home-image"
          />
        </div>
        <div className="body-info-text">
          <h1>Impact on farmers ...</h1>
          <p>
            Plant diseases also have a negative impact on farmers incomes and
            livelihoods. These diseases can cause significant crop losses, which
            can lead to food shortages
          </p>
        </div>
      </div>

      <div className="body-info">
        <div className="body-info-img" data-aos="zoom-in">
          <img
            src={stat3}
            alt="undraw-healthy-lifestyle-6tyl"
            border="0"
            className="home-image"
          />
        </div>
        <div className="body-info-text">
          <h1>Revolutionizing Plant Health ...</h1>
          <p>
            We leverage the power of machine learning to detect deformities and
            diseases in plants. We are working towards a healthy future.
          </p>
        </div>
      </div>

      {/* <div className="body-info odd">
        <div className="body-info-img" data-aos="zoom-in">
          <img
            src={panda}
            alt="undraw-healthy-lifestyle-6tyl"
            border="0"
            className="home-image"
          />
        </div>
        <div className="body-info-text">
          <h1>Agri-Cure</h1>
          <p>
            Discord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </p>
        </div>
      </div> */}
    </motion.div>
  );
}

export default Home;
