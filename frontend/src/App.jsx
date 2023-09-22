import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Accesso from "./Accesso.jsx";
import Registrazione from "./Registrazione.jsx";
import Footer from "./Footer.jsx";
import Dashboard from "./Dashboard.jsx"; // Importa il componente Dashboard

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [areLoginSalvati, setAreLoginSalvati] = useState(false);
  const [arePasswordSalvate, setArePasswordSalvate] = useState(false);
  const [areNoteSalvate, setAreNoteSalvate] = useState(false);
  const [areImpostazioni, setAreImpostazioni] = useState(false);
  const [areInsertLogin, setAreInsertLogin] = useState(false);
  const [areInsertPassword, setAreInsertPassword] = useState(false);
  const [areInsertNota, setAreInsertNota] = useState(false);
  const [IDUtente, setIDUtente]= useState([]);
  const [authToken, setAuthToken]= useState([]);


  return (
    <Router>
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}          
          setAreLoginSalvati={setAreLoginSalvati}          
          setArePasswordSalvate={setArePasswordSalvate}          
          setAreNoteSalvate={setAreNoteSalvate}          
          setAreImpostazioni={setAreImpostazioni}
          setAreInsertLogin={setAreInsertLogin}
          setAreInsertPassword={setAreInsertPassword}
          setAreInsertNota={setAreInsertNota}
          setIDUtente={setIDUtente}
        />
       <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/Accesso" element={<Accesso setIsLoggedIn={setIsLoggedIn} setAuthToken={setAuthToken} />} />
            <Route path="/Registrazione" element={<Registrazione />} />
            <Route path="/" element={<Home />} />
          </>
        )}

        <Route path="/Dashboard" element={isLoggedIn ? <Dashboard 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          authToken={authToken}
          areLoginSalvati={areLoginSalvati}
          arePasswordSalvate={arePasswordSalvate}
          areNoteSalvate={areNoteSalvate}
          areImpostazioni={areImpostazioni}
          areInsertLogin={areInsertLogin}
          areInsertPassword={areInsertPassword}
          areInsertNota={areInsertNota}
          setAreInsertLogin={setAreInsertLogin}
          setAreInsertPassword={setAreInsertPassword}
          setAreInsertNota={setAreInsertNota}
          IDUtente={IDUtente}
          setIDUtente={setIDUtente}
        /> : null} />
      </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
