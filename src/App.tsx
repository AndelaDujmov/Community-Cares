import { useEffect, useState } from 'react'
import './App.css'
import MainPage from './MainPage/MainPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar';
import Activities from './Activities/Activities';
import Organisations from './Organisations/Organisations';
import Volonteers from './Volonteer/Volonteers';
import axios from 'axios';

function App() {
  const [gradovi, setGradovi] = useState([]);

  useEffect(() => {
    axios
    .get("http://localhost:3001/cities")
    .then(rez => setGradovi(rez.data));
  });

  return (
    <>
     <Router>
            <NavigationBar />
            <Routes>
            <Route path="/" element={<MainPage />} />
                <Route path="/activities" element={<Activities/>} />
                <Route path="/volonteers" element={<Volonteers gradovi={gradovi}/>} />
                <Route path="/organisations" element={<Organisations/>} />
            </Routes>
        </Router>
    
    </>
  )
}

export default App
