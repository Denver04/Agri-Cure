import { useEffect } from "react";
import "./home.css";
// import agri from "../../images/agri.jpg";
// import "../../extra.js";
import CircleType from "circletype";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  // const [show , setShow] = useState(true);
  useEffect(() => {
    const circle = new CircleType(document.getElementById("simple_arc"));
    circle.radius(950);
  }, []);

  const containerVariants = {
    hidden:{
      y:"-100vh",
      opacity:0
    },
    visible:{
      opacity:1,
      y:0,
      transition:{delay:0.5 , duration:0.3 , type:"spring" , stiffness:70},
      // transition={{delay:0.7 , duration:1 , type:"spring"}}
    },
    exit:{
      y:"-100vh",
      transition:{ease:"easeInOut"}
    }
  }

  return (
      <motion.div className="home"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      >
        <div className="home-info">
          <h1 id="simple_arc" className="textomimage">lorem ipsum ajhu bujhu</h1>
          <p className="textomimage2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis est,
            consequuntur illo officia voluptatum ad, maxime deleniti temporibus
            necessitatibus incidunt amet distinctio accusantium pariatur
            veritatis, quod eum quam perspiciatis sunt.
          </p>
          <Link to="/start" className="btn-link">Get Started</Link>
        </div>
      </motion.div>
  );
}

export default Home;
