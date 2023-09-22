import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

/* JSX Dario Files  */
import RegisterButton from './registerButton';

const IscrizioneSection = styled.div`
background-color: #ffffff;
color: #1a1a1a;
text-align: center;
padding: 3rem 0;
font-family: 'Roboto', sans-serif; 
display: flex;
justify-content: center;
border-radius: 10px;
line-height: 3.2rem;


@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  nav ul li {
    margin-left: 0;
    margin-top: 1rem;
  }

  .features {
    flex-direction: column;
  }

  .feature {
    margin-bottom: 2rem;
  }
}
`;

// Wrapper rettangolo grigio
const FormWrapper = styled.form`
  background-color: #f2f2f2;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  min-width: 20%; /* Larghezza minima, per DPI adattabili. */ 
  max-width: 50; /* Imposta la larghezza massima in percentuale */
  padding: 2rem 2rem; /* Da tenere, bordi elementi*/
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const inputContainer = styled.div `

`

const FormLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom:center 0.5rem;
  text-align: left;
  display:flex;
  flex-direction: row;
  gap: 20px;
`;

const FormInput = styled.input`
  padding: 0.5rem 1rem;
  
  border: none;
  border-radius: 4px;
  width: 100%;  /* Occupa tutta la larghezza disponibile */
  max-width: 100%; /* Assicura che l'input non superi la larghezza del suo contenitore */
  align-self: center;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const IscrizioneHeading = styled.div`
  font-size: 2.4rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  
`;

const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: left;
flex-direction: column;
`
const FormButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1rem; /* Shrink the button padding */
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 20%; /* Set the button width to 20% to fill the FormWrapper */
  min-width: 150px; /* Set a maximum width for the button on mobile */
  text-align: center; /* Center the text inside the button */

  @media (max-width: 768px) {
    padding: 0.5rem 1rem; /* Adjust padding on mobile */
  }
`;

// Overloading proprietà bottone, in quanto quelle hardcoddate hanno dimensioni troppo piccole.
const ButtonContainer = (hovered) => {
  return {
    width: hovered ? '400px' : '300px',
    height: hovered ? '400px' : '70px',
    // Other custom styles here
  };
};

const Registrazione = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Aggiunto stato per il messaggio di errore
  const [Message, setMessage] = useState(""); // Aggiunto stato per il messaggio 
  const handleSubmit = (e) => {
    e.preventDefault();

 // Verifica se tutti i campi sono stati compilati
  if (!nome || !cognome || !email || !password) {
  setErrorMessage("Tutti i campi sono obbligatori.");
  return;
  }

    axios.post('https://codeprotect.app/api/Registrazione', {
      Nome: nome,
      Cognome: cognome,
      EmailU: email,
      PasswordU: password
    })
      .then((response) => {
        console.log('Risposta dal server:', response.data);
        if (response.data === "L'indirizzo email è già registrato. Vuoi accedere?") {
          setMessage("L'indirizzo email è già registrato. Accedi");
          
        } else {
          navigate('/Accesso', { replace: true });
        }
      })
      .catch((error) => {
        console.error('Errore durante la registrazione:', error);
        setErrorMessage("Errore durante la registrazione. Riprova più tardi."); // Imposta il messaggio di errore
      });

    setNome("");
    setCognome("");
    setEmail("");
    setPassword("");
  };





  // WEBPAGE
  return (
    <IscrizioneSection>
      <FormWrapper onSubmit={handleSubmit}>
        
        
        <FormContainer>
        <IscrizioneHeading>Registrazione</IscrizioneHeading>
        <inputContainer>
          <FormLabel>🧙‍♂️
            <FormInput
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              required
            />
          </FormLabel>
        
          <FormLabel>🟣
            <FormInput
              type="text"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
              placeholder="Cognome"
              required
            />
          </FormLabel>
        
          <FormLabel>📧
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              title="Inserisci un indirizzo email valido"
            />
          </FormLabel>
        
          <FormLabel>🔑
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
              title="La password deve contenere almeno 8 caratteri, una lettera maiuscola o minuscola, un numero e un carattere speciale (@ $ ! % * # ? &)"
            />
          </FormLabel>
          </inputContainer>

        </FormContainer>

        <RegisterButton text="Registrati" 
        onClick={handleSubmit} preW='160px' postW='180px' preH='40px' postH='50px' fontSize='1rem'/>

        {errorMessage && (
          <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
        )}


{Message && (
          <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
        )}
      </FormWrapper>
      {/*ButtonContainer forza CSS rispetto a quell nel JSX del bottone. */}
      
    </IscrizioneSection>
  );
};

export default Registrazione;
