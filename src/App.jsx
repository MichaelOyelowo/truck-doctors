import { Routes, Route } from "react-router-dom"
import TopNotification from "./components/TopNotification";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";
import Journey from "./components/TheJourney"
import TruckShowroom from "./components/TruckShow";
import InventoryGrid from "./components/InventoryGrid"
// import BuyerConfidence from "./components/BuyerConfidence";


function App() {
  
    return (
      <>
        <TopNotification/>
        <Navbar/>
        <Hero/>
        <Journey/>
        <TruckShowroom/>
        <InventoryGrid/>
        {/* <BuyerConfidence/> */}

      </>
    
  )
}

export default App
