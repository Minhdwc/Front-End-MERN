import Menu from './components/layout/header';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accessories from './components/Accessories';
import Food from './components/Food';
import Home from './components/Home';
import Pet from './components/Pet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />}>
          <Route path='Pet' element={<Pet/>}/>
          <Route path = 'Accessories' element={<Accessories />}/>
          <Route path='Food' element={<Food/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
