import { Routes, Route } from "react-router-dom"
import TopNotification from "./components/TopNotification";
import Navbar from "./components/Navbar/Navbar";

function App() {
  
    return (
      <>
        <TopNotification/>
        <Navbar/>
        <Routes>
        {/* Add your routes here later */}
      </Routes>
      </>
    
  )
}

export default App
