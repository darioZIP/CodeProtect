import { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import PropTypes from "prop-types";
import Sidebar from './Sidebar';
import Specifiche from './Specifiche';


const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  grid-template-columns: 40% 40%;
  justify-content: center;
  align-items: stretch;
  gap:20px;
  height: 70vh;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 70vh;
    align-items: center;
    justify-content: flex-start;
    /*width: 85%;*/
    padding: 2rem;
    height: 100% /* Evita clippaggio tra body e footer */

  }

`;


// Sinistra
const SidebarContainer = styled.div`
  background-color: #000000;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  
  border-radius: 10px;
  
  width: 200px;
  
  overflow-y: scroll; 
  
  
  transform: translateY(0);
  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);

  @media (max-width: 768px) {
    min-height: 170px;
  width: 100%;
    
  }


`;

// Destra
const SpecificheContainer = styled.div`
  border-radius: 10px;
  padding: 20px;
  background-color: #f2f2f2;
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: stretch;

  overflow-y: scroll; 
  transform: translateY(0);
  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%);

  @media (max-width: 768px) {
    /*width: 75%*/
    width: 100%;
   
  }
`;

function Dashboard({
  isLoggedIn,
  setIsLoggedIn,
  authToken,
  areLoginSalvati,
  arePasswordSalvate,
  areNoteSalvate,
  areImpostazioni,
  areInsertLogin,
  areInsertPassword,
  areInsertNota,
  setAreInsertLogin,
  setAreInsertPassword,
  setAreInsertNota,
  IDUtente,
  setIDUtente,
}) {

  const [areLogin, setAreLogin]= useState(false);
  const [arePassword, setArePassword]= useState(false);
  const [areNota, setAreNota]= useState(false);
  const [areAccount, setAreAccount]= useState(false);  
  const [areExport, setAreExport]= useState(false);
  const [selectedLoginData, setSelectedLoginData] = useState([]); 
  const [selectedPasswordData, setSelectedPasswordData] = useState([]); 
  const [selectedNoteData, setSelectedNoteData] = useState([]); 
  const [selectedAccountData, setSelectedAccountData] = useState([]); 

  //Funzione per la gestione del refresh
  useEffect(() => {
    // Aggiungi un listener per l'evento 'beforeunload' solo se l'utente è loggato
    if (isLoggedIn) {
      const handleBeforeUnload = (e) => {
        // Mostra un messaggio di conferma
        const confirmationMessage = "Sei sicuro di voler aggiornare la pagina?";
        const userConfirmed = window.confirm(confirmationMessage);

        if (!userConfirmed) {
          // L'utente ha annullato il refresh, impediamo il redirect
          e.preventDefault();
        } else {
          // L'utente ha confermato il refresh, quindi impostiamo isLoggedIn su false
          setIsLoggedIn(false);

          // Effettua il redirect a "/"
          window.location.href = "/";
        }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Rimuovi il listener quando il componente viene smontato
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [isLoggedIn, setIsLoggedIn]);

 //Funzione per la gestioned del token di autorizzazione al login
  const handleAuthToken = (authToken) => {
    
    // Imposta il token nell'header Authorization
    axios.get(`https://codeprotect.app/api/Decode`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        const IDUtente = response.data; // Assumendo che la risposta contenga un campo "data" con l'IDUtente
        
        setIDUtente(IDUtente);
      })
      .catch((error) => {
        console.log('Errore durante la richiesta del dashboard:', error);
      });
  }

 //Funzione per il richiamo della funzione precedentemente dichiarata   
  useEffect(() => {
    if (authToken) {
      // Utilizza il token dalla prop authToken
      handleAuthToken(authToken);
    }
  }, [authToken]);


  return (  
<DashboardContainer>


    <SidebarContainer>
          <Sidebar IDUtente={IDUtente}
            areLoginSalvati={areLoginSalvati}
            arePasswordSalvate={arePasswordSalvate}
            areNoteSalvate={areNoteSalvate}
            areImpostazioni={areImpostazioni}
            areAccount={areAccount}
            setAreAccount={setAreAccount}
            setAreExport={setAreExport}
            setAreLogin={setAreLogin}        
            setArePassword={setArePassword}        
            setAreNota={setAreNota}         
            setSelectedLoginData={ setSelectedLoginData}       
            setSelectedPasswordData={setSelectedPasswordData}       
            setSelectedNoteData={setSelectedNoteData}
            setSelectedAccountData={setSelectedAccountData}
            setAreInsertLogin={setAreInsertLogin}
            setAreInsertPassword={setAreInsertPassword}
            setAreInsertNota={setAreInsertNota}
          />
    </SidebarContainer>

    
    <SpecificheContainer>
            <Specifiche  IDUtente={IDUtente}
            areLoginSalvati={areLoginSalvati}
            arePasswordSalvate={arePasswordSalvate}
            areNoteSalvate={areNoteSalvate}
            areImpostazioni={areImpostazioni}
            areLogin={areLogin} 
            arePassword={arePassword}
            areAccount={areAccount} 
            areNota={areNota}
            areExport={areExport}
            selectedLoginData={selectedLoginData}
            selectedPasswordData={selectedPasswordData}
            selectedNoteData={selectedNoteData}
            selectedAccountData={selectedAccountData}
            areInsertLogin={areInsertLogin}
            areInsertPassword={areInsertPassword}
            areInsertNota={areInsertNota}
            setAreInsertLogin={setAreInsertLogin}
            setAreInsertPassword={setAreInsertPassword}
            setAreInsertNota={setAreInsertNota}    
            /> 
    </SpecificheContainer>
    
</DashboardContainer>
    
  );
}

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired, 
  authToken: PropTypes.string.isRequired,
  areLoginSalvati: PropTypes.bool.isRequired,
  arePasswordSalvate: PropTypes.bool.isRequired,
  areNoteSalvate: PropTypes.bool.isRequired,
  areImpostazioni: PropTypes.bool.isRequired,
  areModify: PropTypes.bool.isRequired,
  areExport: PropTypes.bool.isRequired,
  areDelete: PropTypes.bool.isRequired,
  setAreModify: PropTypes.func.isRequired,
  setAreExport: PropTypes.func.isRequired,
  setAreDelete: PropTypes.func.isRequired,
  areInsertLogin: PropTypes.bool.isRequired,
  areInsertPassword: PropTypes.bool.isRequired,
  areInsertNota: PropTypes.bool.isRequired,
  setAreInsertLogin: PropTypes.func.isRequired,
  setAreInsertPassword: PropTypes.func.isRequired,
  setAreInsertNota: PropTypes.func.isRequired,
  IDUtente: PropTypes.string.isRequired,
  setIDUtente: PropTypes.func.isRequired,
};

export default Dashboard;
