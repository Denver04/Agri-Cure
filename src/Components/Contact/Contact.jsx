import { useRef , useState } from 'react';
import cont from "../../images/c.svg"
import "./contact.css";
import {motion} from "framer-motion"
// import {Link} from "react-router-dom"
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contact() {

  const form = useRef();
  const [input , setInput] = useState({
    name:"",
    email:"",
    textarea:""
  })

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_m6abes2', 'template_engpn7b', form.current, 'vqCFLk2iKYYKNXLX_')
      .then((result) => {
          console.log(result.text);
          setInput({
            name:"",
            email:"",
            textarea:""
          })
          toast.success("Your message has been sent successfully");
      }, (error) => {
          console.log(error.text);
          toast.error("Oops! Something went wrong");
          toast.info("Please try again later")
      });
  };

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
              <img src={cont} alt="photos is here" />
          </div>
          <form className='contact-form' ref={form} onSubmit={sendEmail}>
              <h4>Contact Us</h4>
              <div className='input-name input'>
                  <span>Name :</span>
                  <input type="text" required name='user_name' value={input.name} onChange={(e)=>setInput(e.target.value)} />
              </div>
              <div className='input-email input'>
                  <span>Email :</span>
                  <input type="email" required name='user_email' value={input.email} onChange={(e)=>setInput(e.target.value)}/>
              </div>
              <div className='input-textarea input'>
                  <span>Message :</span>
                  <textarea type="text" rows="5" cols="5" required name='message' value={input.textarea} onChange={(e)=>setInput(e.target.value)} />
              </div>
              <button className='submit-link display1' type='submit'>Send</button>
              <ToastContainer
              autoClose={3000}
              theme="dark"
              />
          </form>
      </motion.div>
    )
  }
  
  export default Contact