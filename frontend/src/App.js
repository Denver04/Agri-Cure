import { useState } from 'react';
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

function App() {
  const location = useLocation();
  const [theme , setTheme] = useLocalStorage("theme" ? "light" : "dark")
  const change = () =>{
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // console.log(light);
  }
  return (
    // <BrowserRouter>
    <main theme={theme}>
    <AnimatePresence>
      <Navbar className={`${theme && "mode"}`} change={change}  />
      <ScrolTop />
      <Routes location={location} key={location.key}>
        <Route path='/' element={<Home />} />
        <Route path='/start' element={<Body />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      {/* <Footer /> */}
      <ScrolTop />
      <Footer />
    </AnimatePresence>
    </main>
    // </BrowserRouter>
  )
}

export default App;
