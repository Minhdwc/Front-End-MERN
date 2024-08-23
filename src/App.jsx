import Menu from "../src/components/layout/header";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/UI/Home.jsx"
import Pet from "../src/components/UI/Pet.jsx";
import Accessories from "../src/components/UI/Accessories.jsx";
import Food from "../src/components/UI/Food.jsx";

function App() {
  return (
    <div className="App">
      <Menu />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Pet" element={<Pet />} />
            <Route path="/Accessories" element={<Accessories />} />
            <Route path="/Food" element={<Food />} />
          </Routes>
    </div>
  );
}

export default App;
