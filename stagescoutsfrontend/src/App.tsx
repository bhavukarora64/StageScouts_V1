import './App.css'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage';
import EventPage from './components/Events Page/EventPage';
import AboutPage from './components/About Page/AboutPage';
import ContactPage from './components/Contact Page/ContactPage';
import Venues from './components/Venues Page/VenuePage';
import VenueSeating from './components/Venues Page/VenueSeating';
import LoginPage from './components/Authentication Pages/LoginPage';
import SignupPage from './components/Authentication Pages/SignupPage';
import { RecoilRoot } from 'recoil'
function App() {
  return (
    <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<LandingPage/>} />
            <Route path="/Home" element={<LandingPage/>} />
            <Route path="/Events" element={<EventPage/>} />
            <Route path="/About" element={<AboutPage/>} />
            <Route path="/Contact" element={<ContactPage/>} />
            <Route path="/Venues" element={<Venues/>} />
            <Route path="/VenueSeating" element={<VenueSeating/>} />
            <Route path="/Login" element={<LoginPage/>}></Route>
            <Route path="/Signup" element={<SignupPage/>}></Route>
            <Route path="*" element={<ContactPage/>} />
          </Routes>
        </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
