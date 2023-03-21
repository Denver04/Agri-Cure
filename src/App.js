import './App.css'
import Navbar from './Components/Navbar/Navbar';
import Body from './Components/Body/Body';
import Home from './Components/Home/Home';
import { Route , Routes , useLocation} from 'react-router-dom';
import ScrolTop from './Components/ScrollTop/ScrolTop';
import { AnimatePresence } from 'framer-motion';
import Contact from './Components/Contact/Contact';
import Footer from "./Components/footer/Footer"

function App() {
  const location = useLocation();
  return (
    // <BrowserRouter>
    <AnimatePresence>
      <Navbar />
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
    // </BrowserRouter>
  )
}

export default App;
