import { Routes, Route } from "react-router-dom"
import TopNotification from "./components/TopNotification";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero";

function App() {
  
    return (
      <>
        <TopNotification/>
        <Navbar/>
        <Hero/>
        <Routes>
        {/* Add your routes here later */}
      </Routes>
      </>
    
  )
}

export default App
