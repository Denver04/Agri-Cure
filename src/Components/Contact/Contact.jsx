import React from 'react';
import cont from "../../images/c.svg"
import "./contact.css";
import {motion} from "framer-motion"

function Contact() {

    const ContactVariants = {
        hidden:{
          y:"100vh",
          opacity:0
        },
        visible:{
          opacity:1,
          y:0,
          transition:{delay:0.5 , duration:0.3 , type:"spring" , stiffness:80},
          // transition={{delay:0.7 , duration:1 , type:"spring"}}
        },
        exit:{
          y:"100vh",
          transition:{ease:"easeInOut"}
        }
      }

    return (
      <motion.div className='contact'
      variants={ContactVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      >
          <div className='contact-image'>
              <img src={cont} />
          </div>
          <div className='contact-form'>
              <h4>Contact Us</h4>
              <div className='input-name input'>
                  <span>Name :</span>
                  <input type="text" required />
              </div>
              <div className='input-email input'>
                  <span>Email :</span>
                  <input type="email" required />
              </div>
              <div className='input-textarea input'>
                  <span>Message :</span>
                  <textarea type="text" rows="5" cols="5" required />
              </div>
          </div>
      </motion.div>
    )
  }
  
  export default Contact