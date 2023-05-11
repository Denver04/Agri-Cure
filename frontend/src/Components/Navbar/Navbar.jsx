/* eslint-disable react/prop-types */
import  { useState , useRef , useEffect } from 'react';
import "./navbar.css";
import { Link , NavLink } from 'react-router-dom';
import {motion} from "framer-motion"
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useLocalStorage from 'use-local-storage';
import logo from "../../images/fav.png"

function Navbar({ change }) {

    const [drawer , setDrawer] = useState(false);
    const [mode , setMode] = useLocalStorage("theme", true);
    const openDrawer = () =>{
        setDrawer(!drawer);
        // console.log(drawer);
    }
    const changeMode = () =>{
       setMode(!mode);
       change(!mode);
    //    console.log(mode);
    }

    const NavbarVariants = {
        hidden:{
          x:-10,
        },
        visible:{
          x:0,
          transition:{duration:1 , type:"spring" , stiffness:250},
          // transition={{delay:0.7 , duration:1 , type:"spring"}}
        },
        exit:{
          x:-10,
          transition:{ease:"linear" , duration:1}
        }
      }

      
    useEffect(() => {
        document.addEventListener("click" , handleOutsideClick , true)
        // let handler = () => {
        //     setDrawer(false);
        // }
    } , []);
      
    const refs = useRef(null);
            
    const handleOutsideClick = (e) => {
    const element = refs.current;
        if(element!==e.target){
            setDrawer(false);
        }
        else{
            setDrawer(true);
        }
    }
    
  return (
    <div className={`navbar ${ mode && "dark"}`}>
        <div className='logo-part'>
            <div className={`menu-icon`} >
                <MenuIcon className='icon' onClick={openDrawer}/>
            </div>
            <Link to="/" className='logo-link'>
                <div className='logo'>
                    <img src={logo} alt='Logo Here' />
                    <p>Agri-Cure</p>
                </div>
            </Link>
        </div>
        <div onClick={changeMode} className='menu-icon'>
            {
                !mode ? <LightModeOutlinedIcon className='icon' /> : <DarkModeOutlinedIcon className='icon' />
            }
        </div>
        {
            drawer && 
            <motion.div className='drawer'
            variants={NavbarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={refs}
            >
                <div onClick={openDrawer} className='menu-icon'><CloseIcon className='icon'/></div>
                <NavLink to="/" end className="linkss">
                <div className='drawer-links'>
                    <div className='hovering-box'>
                        <div className='hovering'>
                            <HomeOutlinedIcon className='icon' />
                            <HomeIcon className='icon-2' />
                        </div>
                    </div>
                    Home
                </div>
                </NavLink>

                <NavLink to="/start" end className="linkss">
                <div className='drawer-links'>
                    <div className='hovering-box'>
                        <div className='hovering'>
                            <ArrowCircleRightOutlinedIcon className='icon' />
                            <ArrowCircleRightIcon className='icon-2' />
                        </div>
                    </div>
                    Get Started
                </div>
                </NavLink>

                <NavLink to="/contact" end className="linkss">
                <div className='drawer-links'>
                    <div className='hovering-box'>
                        <div className='hovering'>
                            <ContactPageOutlinedIcon className='icon' />
                            <ContactPageIcon className='icon-2' />
                        </div>
                    </div>
                    Contact
                </div>
                </NavLink>
                {/* <div className='drawer-links'>
                    <button className='theme-change'>Change theme</button>
                </div> */}
            </motion.div>
        } 
    </div>
  )
}

export default Navbar