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
  const [cities, setCities] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [organisations, setOrganisations] = useState([]);
  const [volonteers, setVolonteers] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:3001/cities"),
      axios.get("http://localhost:3001/organisations"),
      axios.get("http://localhost:3001/volonteers")
    ])
    .then(([rezCities, rezOrganisations, rezVolonteers]) => {
        setCities(rezCities.data);
        setOrganisations(rezOrganisations.data);
        setVolonteers(rezVolonteers.data);
    });
  }, [organisations, volonteers]);

  return (
    <>
     <Router>
            <NavigationBar admin={isAdmin} setAdmin={setIsAdmin} />
            <Routes>
            <Route path="/" element={<MainPage />} />
                <Route path="/activities" element={<Activities cities={cities} admin={isAdmin} orgs={organisations} volonteers={volonteers} setVolonteers={setVolonteers} />} />
                <Route path="/volonteers" element={<Volonteers cities={cities} volonteers={volonteers} admin={isAdmin} />} />
                <Route path="/organisations" element={<Organisations organisations={organisations} cities={cities} admin={isAdmin}/>} />
            </Routes>
        </Router>
    
    </>
  )
}

export default App
