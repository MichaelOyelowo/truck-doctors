import { Routes, Route } from "react-router-dom"
import TopNotification from "./components/TopNotification";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import TruckShowroom from "./components/TruckShow";
import InventoryGrid from "./components/InventoryGrid"
import Journey from "./components/TheJourney"

function App() {
  
    return (
      <>
        <TopNotification/>
        <Navbar/>
        <Hero/>
        <TruckShowroom/>
        <Journey/>
        <InventoryGrid/>

      </>
    
  )
}

export default App
