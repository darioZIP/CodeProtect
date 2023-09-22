import { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

const SidebarContainer = styled.div`
  width: 25%;
  background-color: #000000;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  height: 100vh

  @media (max-width: 768px) {
    width: 100%
    display: flex;
    flex-direction: column;
    width: auto;
    height: 400px;
  }
  
`;

const SitoText = styled.div`
  cursor: pointer;
  color: #e6e6e6;
  margin-bottom: 8px;

  // Selected Item
  ${({ isActive }) =>
    isActive &&
    `
    font-weight: bold;
    font-size: 19px;
    color: white; // Change the color for active items
  `}
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Allinea gli elementi a sinistra */
`;

const MenuItem = styled.li`
  margin-left: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: left; /* Allinea il testo a sinistra */

  @media (max-width: 768px) {
    margin: 0;
    margin-top: 1rem;
  }

  a {
    color: #ffffff;
    text-decoration: none;

    &:visited {
      color: #ffffff;
    }
  }
`;




/*_________________________________________________________________________________________________________*/
/*_________________________________________________________________________________________________________*/
/*_________________________________________________________________________________________________________*/

const Sidebar = ({
  areLoginSalvati,
  arePasswordSalvate,
  areNoteSalvate,
  areImpostazioni,
  areAccount,
  setAreAccount,
  setAreExport,
  setSelectedAccountData,
  IDUtente, 
  setAreImpostazioni,  
  setAreLogin,
  setArePassword,
  setAreNota,
  setSelectedLoginData,
  setSelectedPasswordData,
  setSelectedNoteData,  
  setAreInsertLogin,
  setAreInsertPassword,
  setAreInsertNota,
}) => {
  const [activeItem, setActiveItem] = useState(null); // Store the active item's name
  

  const [passwordNames, setPasswordNames] = useState([]);
  const [noteNames, setNoteNames] = useState([]);
  const [NomeSito, setNomeSito] = useState([]);
  const [loginData, setLoginData] = useState([]);
  const [passwordData, setPasswordData] = useState([]);
  const [noteData, setNoteData]  = useState([]);
  
 //Funzione per la gestione del click sul nomesito
  const handleLoginClick = (item) => {
  
    // Trova l'oggetto completo da loginData in base al nome selezionato
    const selectedLogin = loginData.find((data) => data.NomeSito === item);
    setSelectedLoginData(selectedLogin);  
    console.log("Login selezionato", selectedLogin)
    setAreExport(false)
    setAreAccount(false)
    setAreLogin(true)
    setArePassword(false)
    setAreNota(false)
    setAreInsertLogin(false)
    setAreInsertPassword(false)
    setAreInsertNota(false)
    setActiveItem(item === activeItem ? null : item); // Set the clicked item as active
  }



 //Funzione per la gestione del click sul nomepassword
  const handlePasswordClick = (item) => {
    // Trova l'oggetto completo da loginData in base al nome selezionato
    const selectedPassword = passwordData.find((data) => data.NomeP === item);
    setSelectedPasswordData(selectedPassword );
    setAreExport(false)
    setAreAccount(false)
    setArePassword(true)
    setAreLogin(false)
    setAreNota(false)
    setAreInsertLogin(false)
    setAreInsertPassword(false)
    setAreInsertNota(false)
    setActiveItem(item === activeItem ? null : item); // Toggle active state
  }

 //Funzione per la gestione del click sul nomenota
  const handleNoteClick = (item) => {
    
    setActiveItem(item === activeItem ? null : item); // Toggle active state
    // Trova l'oggetto completo da loginData in base al nome selezionato
    const selectedNota = noteData.find((data) => data.NomeNota === item);
    setSelectedNoteData( selectedNota );
    setAreExport(false)
    setAreAccount(false)
    setAreNota(true)
    setArePassword(false)
    setAreLogin(false)
    setAreInsertLogin(false)
    setAreInsertPassword(false)
    setAreInsertNota(false)
    
  }

 //Funzione per la gestione del click su account
  const handleAccountClick = () => {
    // Trova l'oggetto completo da loginData in base al nome selezionato
    
    setAreExport(false)
    setAreAccount(true)
    setAreImpostazioni(true)
    setAreNota(false)
    setArePassword(false)
    setAreLogin(false)
    setAreInsertLogin(false)
    setAreInsertPassword(false)
    setAreInsertNota(false)
   
  }

 //Funzione per la gestione del click sue esporta
  const handleExportClick = () => {
    // Trova l'oggetto completo da loginData in base al nome selezionato
    setAreAccount(false)
    setAreExport(true)
    setAreImpostazioni(true)
    setAreNota(false)
    setArePassword(false)
    setAreLogin(false)
    setAreInsertLogin(false)
    setAreInsertPassword(false)
    setAreInsertNota(false)
   
    
  }

  //Use Effect per il fetch dei nomi delle note 
  useEffect(() => {
    const fetchNoteNames = async () => {
      try {
        // Extract the relevant part of IDUtente and clean it
        const IDUtenteString = JSON.stringify(IDUtente);
        const parts = IDUtenteString.split(':');
        const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, '');

        // Fetch loginData based on the cleaned IDUtente
        const response = await axios.get(`https://codeprotect.app/api/NoteG?IDUtente=${cleanedIDUtenteString}`);
        const noteDataResponse = response.data;

        console.log("Risposta dalla richiesta di fetch delle note:", noteDataResponse);

        if (noteDataResponse && noteDataResponse.data && Array.isArray(noteDataResponse.data)) {
          const nomiNote = noteDataResponse.data.map(item => item.NomeNota);
          setNoteNames(nomiNote); // Imposta l'array dei nomi dei siti
          setNoteData(noteDataResponse.data)

          console.log('Trasfer to notedata', noteData);
        } else {
          console.log('Nessun dato (nota) disponibile o formato dei dati errato');
        }

      } catch (error) {
        console.error(
          "Errore durante il recupero delle note:",
          error
        );
      }
    };
    if (areNoteSalvate) {
      fetchNoteNames();
    }
  }, [areNoteSalvate, IDUtente]);

  //Use Effect per il fetch dei nomi dei login
  useEffect(() => {
    const fetchNomeSito = async () => {
      try {
        
          // Extract the relevant part of IDUtente and clean it
          const IDUtenteString = JSON.stringify(IDUtente);
          const parts = IDUtenteString.split(':');
          const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, '');

          // Fetch loginData based on the cleaned IDUtente
          const response = await axios.get(`https://codeprotect.app/api/LoginG?IDUtente=${cleanedIDUtenteString}`);
          const loginDataResponse = response.data;

          console.log("Risposta dalla richiesta di fetch del nome sito:", loginDataResponse);

          if (loginDataResponse && loginDataResponse.data && Array.isArray(loginDataResponse.data)) {
            const nomiSiti = loginDataResponse.data.map(item => item.NomeSito);
            setNomeSito(nomiSiti); // Imposta l'array dei nomi dei siti
            setLoginData(loginDataResponse.data);

            console.log('Trasfer to logindata', loginData);
          } else {
            console.log('Nessun dato disponibile o formato dei dati errato');
          }
        
      } catch (error) {
        console.error(
          "Errore durante il recupero delle informazioni di login:",
          error
        );
      }
    };

    if (areLoginSalvati) {
      fetchNomeSito();
    }

  }, [areLoginSalvati, IDUtente]);

  //Use Effect per il fetch dei nomi delle password
  useEffect(() => {

    const fetchPasswordNames = async () => {
      try {
          // Extract the relevant part of IDUtente and clean it
          const IDUtenteString = JSON.stringify(IDUtente);
          const parts = IDUtenteString.split(':');
          const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, '');

          const response = await axios.get(`https://codeprotect.app/api/PasswordG?IDUtente=${cleanedIDUtenteString}`);
          const passwordDataResponse = response.data;

        console.log("Risposta dalla richiesta di fetch del nome delle password:", passwordDataResponse);

        if (passwordDataResponse && passwordDataResponse.data && Array.isArray(passwordDataResponse.data)) {
          const nomiPassword = passwordDataResponse.data.map(item => item.NomeP);
          setPasswordNames(nomiPassword); // Imposta l'array dei nomi dei siti
          setPasswordData(passwordDataResponse.data);

          console.log('Trasfer to passworddata', passwordData);

        } else {
          console.log('Nessun dato disponibile o formato dei dati errato');
        }

      } catch (error) {
        console.error(
          "Errore durante il recupero delle passoword:",
          error
        );
      }
    };
    if (arePasswordSalvate) {
      fetchPasswordNames();
    }

   
  },[arePasswordSalvate,IDUtente]);

  //Use Effect per il fetch dei dati dell account
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        // Extract the relevant part of IDUtente and clean it
        const IDUtenteString = JSON.stringify(IDUtente);
        const parts = IDUtenteString.split(':');
        const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, '');

        // Fetch loginData based on the cleaned IDUtente
        const response = await axios.get(`https://codeprotect.app/api/Account?IDUtente=${cleanedIDUtenteString}`);
        const accountDataResponse = response.data;

        console.log("Risposta dalla richiesta di fetch dei dati account:", accountDataResponse);

        if (accountDataResponse && accountDataResponse.data && Array.isArray(accountDataResponse.data)) { 
          setSelectedAccountData(accountDataResponse.data)

        } else {
          console.log('Nessun dato disponibile o formato dei dati errato');
        }

      } catch (error) {
        console.error(
          "Errore durante il recupero delle informazioni:",
          error
        );
      }
    };
    if (areAccount) {
      fetchAccount();
    }
  }, [areAccount, IDUtente]);  
 

  return (

    <SidebarContainer>

        {/* Gestione della fetch del nominativo del sito per la visualizzazione in sidebar */}
        {areLoginSalvati && (
         <div>        
            <span>
              {NomeSito.map((name, index) => (
                <div key={index}>
                  <SitoText isActive={name === activeItem} onClick={(e) => { e.preventDefault(); handleLoginClick(name);}}>{name}</SitoText>

                </div>
              ))}
            </span>
          </div>
        )}

        {/* Gestione della fetch del nominativo della password per la visualizzazione in sidebar */}
        {arePasswordSalvate && (
          <div>
            <ul>
              {passwordNames.map((name, index) => (
                <div key={index}>
                  <SitoText isActive={name === activeItem} onClick={(e) => { e.preventDefault(); handlePasswordClick(name);}}>{name}</SitoText>
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* Gestione della fetch del nominativo della nota per la visualizzazione in sidebar */}
        {areNoteSalvate && (
             <div>
              
             <ul>
               {noteNames.map((name, index) => (
                 <div key={index}>
                   <SitoText isActive={name === activeItem} onClick={(e) => { e.preventDefault(); handleNoteClick(name);}}>{name}</SitoText>
                 </div>
               ))}
             </ul>
           </div>
         )}

        {/* Gestione della visualizzazione delle impostazioni per mostrarle in sidebar */}
        {areImpostazioni && (
          
            <span>
            <MenuList>
            <MenuItem>
            <SitoText onClick={(e) => { e.preventDefault(); handleAccountClick();}}>Account Utente</SitoText>
            </MenuItem>
            <MenuItem>
            <SitoText onClick={(e) => { e.preventDefault(); handleExportClick();}}>Esporta tutti i tuoi dati</SitoText>
            </MenuItem>
          </MenuList>
            </span>
          
        )}
      
    </SidebarContainer>

  );
};

Sidebar.propTypes = {
  areLoginSalvati: PropTypes.bool.isRequired,
  arePasswordSalvate: PropTypes.bool.isRequired,
  areNoteSalvate: PropTypes.bool.isRequired,
  areImpostazioni: PropTypes.bool.isRequired,
  areAccount: PropTypes.bool.isRequired,
  setAreAccount: PropTypes.func.isRequired,
  setAreExport: PropTypes.func.isRequired,
  IDUtente: PropTypes.string.isRequired, 
  setAreLogin:PropTypes.func.isRequired, 
  setArePassword: PropTypes.func.isRequired,
  setAreNota: PropTypes.func.isRequired,
  setAreImpostazioni: PropTypes.func.isRequired,
  setSelectedLoginData:PropTypes.func.isRequired,
  setSelectedPasswordData:PropTypes.func.isRequired,
  setSelectedNoteData:PropTypes.func.isRequired, 
  setSelectedAccountData:PropTypes.func.isRequired, 
  setAreInsertLogin: PropTypes.func.isRequired,
  setAreInsertPassword: PropTypes.func.isRequired,
  setAreInsertNota: PropTypes.func.isRequired,
}

export default Sidebar;
