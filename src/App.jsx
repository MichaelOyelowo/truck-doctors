import { Routes, Route } from "react-router-dom"
import TopNotification from "./components/TopNotification";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import TruckShowroom from "./components/TruckShow";

function App() {
  
    return (
      <>
        <TopNotification/>
        <Navbar/>
        <Hero/>
        <TruckShowroom/>
        <Routes>
        {/* Add your routes here later */}
      </Routes>
      </>
    
  )
}

export default App
