import React from 'react';
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Body from './Components/Body/Body';
import Home from './Components/Home/Home';
import { Route , Routes , useLocation} from 'react-router-dom';
import ScrolTop from './Components/ScrollTop/ScrolTop';
import { AnimatePresence } from 'framer-motion';
import Contact from './Components/Contact/Contact';
import Footer from "./Components/footer/Footer"
import useLocalStorage from 'use-local-storage';
import { drawerContext } from './Components/Context/Drawer';
// import { useState } from 'react';

function App() {

  const { leftmenu } = React.useContext(drawerContext);
  const location = useLocation();
  const [theme , setTheme] = useLocalStorage("dark");
  const change = (bool) =>{
    if(bool === true){
    setTheme("light");
    }
    else{
      setTheme("dark");
    }
  }
  return (
    // <BrowserRouter>
    // eslint-disable-next-line react/no-unknown-property
    <main theme={theme} >
    <AnimatePresence>
      <Navbar change={change}/>
      <ScrolTop />
      <div className={leftmenu && "light-bg"}>
        <Routes location={location} key={location.key}>
          <Route path='/' element={<Home />} />
          <Route path='/upload-image' element={<Body />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
      {/* <Footer /> */}
      <ScrolTop />
      <Footer />
    </AnimatePresence>
    </main>
    // </BrowserRouter>
  )
}

export default App;
