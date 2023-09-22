import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";

/* JSX Dario Files  */
import RegisterButton from './registerButton';


/* Main page container. */
const AccediSection = styled.div`
display: flex;
align-items: stretch;
justify-content: center;

background-color: #fffffa;
color: #1a1a1a;
text-align: center;
padding: 3rem 0;
font-family: "Roboto", sans-serif;
  
`;

const FormWrapper = styled.form`
background-color: #f2f2f2;
color: #1a1a1a;
display: flex;
flex-direction: column;
align-items: center;
border-radius: 10px;
min-width: 0%; /* Larghezza minima, per DPI adattabili. */ 
max-width: 100%; /* Imposta la larghezza massima in percentuale */
padding: 2rem 2rem; /* Da tenere, bordi elementi*/
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px;

@media (max-width: 768px) {
  text-align: center;
}
`;
const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: left;
flex-direction: column;
gap: 15px;
align-items: center;
`
const FormInput = styled.input`
  padding: 0.5rem 1rem;
 
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;
  align-self: center;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const AccediHeading = styled.div`
  font-size: 2.4rem;
  margin-bottom: 0rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const formStyle = { 
  fontSize: "1.2rem",
  marginBottom: "0.0rem", // Corrected the value
  textAlign: "left",
  display: "flex",
  flexDirection: "row", // Corrected the property name
  /*alignItems: "center",*/
  gap: "20px",
};

const FormLabel = styled.label`
font-size: 1.2rem;
margin-bottom: 0rem;
text-align: center;


@media (max-width: 768px) {
  margin-bottom: 0.0rem;
}
`;

const ButtonContainer = styled.div`
padding-top: 10px;
`

const Accesso = ({ setIsLoggedIn, setAuthToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Aggiunto stato per il messaggio di errore
  const [IDUnivoco, setIDUnivoco] = useState("");
  const [Update, setUpdate] = useState(false);

  const handleLoginSuccess = (authToken) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', authToken); 
    console.log('Token generato', authToken);
    setAuthToken(authToken);
    navigate("/Dashboard", { replace: true });
  };


  const handleSubmit = () => {

 // Verifica se tutti i campi sono stati compilati
 if (!email ||  !password) {
  setErrorMessage("Tutti i campi sono obbligatori.");
  return;
  }


    axios
      .post(
        "https://codeprotect.app/api/Accesso",
        { EmailU: email, PasswordU: password },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Accesso effettuato con successo") {
          handleLoginSuccess(response.data.authToken);
        } else {
          // Il login non è stato effettuato con successo
          navigate("/Accesso", { replace: true });
          alert("Credenziali errate. Reinserire i dati.");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
        setErrorMessage("Errore durante il login. Riprova più tardi."); // Imposta il messaggio di errore
      });
  };

  const handleUpdate = () => {

    // Verifica se tutti i campi sono stati compilati
    if (!email ||  !IDUnivoco) {
     setErrorMessage("Tutti i campi sono obbligatori.");
     return;
     }
   
   
       axios
         .post(
           "https://codeprotect.app/api/RecuperaPassword",
           { EmailU: email, IDUnivoco: IDUnivoco },
           { timeout: 15000 }
         )
         .then((response) => {
           console.log("Risposta dal server:", response.data.message);
   
           if (response.data.message === "Email con la nuova password inviata con successo") {
             setErrorMessage("Email con la password inviata con successo")
           } else {
             // Il login non è stato effettuato con successo
             setErrorMessage("Email non inviata riprovare.");
           }
         })
         .catch((error) => {
           console.error("Errore durante il recupero:", error);
           setErrorMessage("Errore durante il recupero. Riprova più tardi."); // Imposta il messaggio di errore
         });
     };



  return (
    <AccediSection>
      <FormWrapper onSubmit={handleSubmit}>
      <FormContainer>
        <AccediHeading>Accesso</AccediHeading>
        
        <div style={formStyle}>
          <FormLabel HtmlFor= "email">📧</FormLabel>
          <FormInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
            title="Inserisci un indirizzo email valido"
          />
        </div>
        <div style={formStyle}>
          <FormLabel HtmlFor= "password">🔑</FormLabel>
          <FormInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            title="La password deve contenere almeno 8 caratteri, una lettera maiuscola o minuscola, un numero e un carattere speciale (@ $ ! % * # ? &)"
          />
        </div>

        <ButtonContainer>
        <RegisterButton text="Accedi" 
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }} 
        preW='140px' postW='150px' preH='40px' postH='50px' fontSize='1rem'/>
        </ButtonContainer>

        <ButtonContainer>
        <RegisterButton text="Recupera Password" 
        onClick={(e) => {
          e.preventDefault();
          setUpdate(true)
        }} 
        preW='140px' postW='150px' preH='60px' postH='70px' fontSize='1rem'/>
        </ButtonContainer>


        {/*RECUPERO PASSWORD*/}
        {Update && (
        <FormWrapper onSubmit={handleSubmit}>
          <FormContainer>
                    <div style={formStyle}>
                    <FormLabel HtmlFor= "email">📧</FormLabel>
                    <FormInput
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                      title="Inserisci un indirizzo email valido"
                    />      
                  </div>
                  <div style={formStyle}>
                    <FormLabel HtmlFor= "idunivoco">🔒</FormLabel>
                    <FormInput
                      id="idunivoco"
                      type="text"
                      value={IDUnivoco}
                      onChange={(e) => setIDUnivoco(e.target.value)}
                      placeholder="ID Univoco"
                      required
                      title="Inserisci un ID Univoco valido"
                    />      
                  </div>

              <ButtonContainer>
              <RegisterButton text="Invia" 
              onClick={(e) => {
                e.preventDefault();
                handleUpdate()
              }} 
              preW='140px' postW='150px' preH='40px' postH='50px' fontSize='1rem'/>
              </ButtonContainer>

              </FormContainer>
            </FormWrapper>
              )}

              {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>
              )}


              </FormContainer>
          </FormWrapper>




    </AccediSection>
  );
};

Accesso.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setAuthToken:PropTypes.string.isRequired,
}

export default Accesso;
