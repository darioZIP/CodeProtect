import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Definizione di uno stile per il container del componente Specifiche
const SpecificheContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0px;
  margin-bottom: 20px;
  /*background-color: #ffffff;*/
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;


  @media (max-width: 768px) {
    height: 350px;
  }


`;

const BoldFont = styled.div`
font-weight: bold;
font-family: "Roboto", sans-serif;
font-size: 20px;

`



/* Single input */
const SingleInput = styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
gap: 20px;
`

/* Single result, appearing in password section. */
const SingleResult = styled.div`
display: flex;
align-items: center;
gap: 20px;
width: 100%;
`

const TestoBold = styled.div`
font-weight: bold;
font-family: "Roboto", sans-serif;
text-transform: uppercase;

`

const AllInputContainer = styled.div`
gap: 5px;
display:flex;
flex-direction: column;
`


/* Emoji + Form con nome */
const FormInput = styled.input`
  padding: 0.5rem 1rem;
  /*margin-bottom: 1rem;*/
  border: none;
  border-radius: 4px;
  width: auto;
  

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const EmojiStyle = styled.div`
font-size: 25px;
`

const FormLabel = styled.label`
  font-size: 25px;
  
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 0.2rem;
  }
`;

const SavedItemsWrapper = styled.form`
  background-color: #f2f2f2;
  font-family: "Roboto", sans-serif;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: auto;
  margin: 0 auto;
  border: 2px solid;
  border-radius: 10px;
  padding: 20px;
  gap: 5px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    text-align: left;
    justify-content: center;
    gap: 15px;
  }
`;

const FormWrapper = styled.form`
  background-color: #f2f2f2;
  color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  margin: 0 auto;
  border: 2px solid;
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const FormButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0);
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  min-width: 100px;
  text-align: center;
  transition: font-size 0.1s ease-in-out, border 0.1s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.1s ease-in-out; /* Add transitions for multiple properties */
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    color: black;
    background-color: white;
    border: 1px solid;
    
  }

  &:active {
    color: black;
    background-color: white;
    box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.2) inset;
    border-color: black;
    font-size: 105%;
  }

`;




const DeleteButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  min-width: 100px;
  text-align: center;
  
  transition: 
    font-size 0.1s ease-in-out, 
    border 0.1s ease-in-out, 
    border-color 0.1s ease-in-out,
    background-color 0.2s ease-in-out, 
    color 0.2s ease-in-out, 
    box-shadow 0.1s ease-in-out; /* Add transitions for multiple properties */
  
  &:hover {
    color: #dbdbdb;
    background-color: #a80000;
    border: 1px solid;
    border-color: black;
    
  }

  &:active {
    color: red;
    background-color: white;
    box-shadow: 5px 10px 5px rgba(0, 0, 0, 0.2) inset;
    border-color: red;
    font-size: 105%;
  }


  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;



/*_____________________________________________________________________________________________________________ */
/* Funzioni */

function Specifiche({
  IDUtente,
  areLoginSalvati,
  arePasswordSalvate,
  areNoteSalvate,
  areImpostazioni,
  areLogin,
  areNota,
  arePassword,
  areAccount,
  areExport,
  selectedAccountData,
  selectedLoginData,
  selectedPasswordData,
  selectedNoteData,
  areInsertLogin,
  areInsertPassword,
  areInsertNota,
  setAreInsertLogin,
  setAreInsertPassword,
  setAreInsertNota,
}) {

  
  const [Email, setEmail] = useState("");
  const [NomeSito, setNomeSito] = useState("");
  const [URL, setURL] = useState("");
  const [Password, setPassword] = useState("");
  const [NomeP, setNomeP] = useState("");
  const [NomeNota, setNomeNota] = useState("");
  const [Nome, setNome] = useState("");
  const [Nota, setNota] = useState("");
  const [Cognome, setCognome] = useState("");
  const [EmailU, setEmailU] = useState("");
  const [PasswordU, setPasswordU] = useState("");
  const [IDUnivoco, setIDUnivoco] = useState("");
  const [isModifying, setIsModifying] = useState(false);
  const [Message, setMessage] = useState(""); // Aggiunto stato per il messaggio di errore
  const [errorMessage, setErrorMessage] = useState(""); // Aggiunto stato per il messaggio di errore
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  //Funzione per la gestione della scomparsa dei messaggi
  useEffect(() => {
    // Imposta un timeout di 10 secondi per nascondere i messaggi
    const timeoutId = setTimeout(() => {
      setErrorMessage("");
      setMessage("");
    }, 5000); // 10000 millisecondi = 10 secondi

    // Cancella il timeout quando il componente si smonta
    return () => clearTimeout(timeoutId);
  }, [errorMessage, Message]);

  //Funzione per la gestione della visibilitá delle password nelle form
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Funzione per copiare gli oggetti delle form negli appunti
  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch((error) => {
          console.error("Errore durante la copia negli appunti:", error);
        });
    }
  };

  //Funzione dei post delle informazioni di login alla api corrispondente
  const handleLoginSubmit = () => {
    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, "");

    if (!NomeSito || !URL || !Email || !Password) {
      setErrorMessage("I campi sono obbligatori.");
      return;
    }

    axios
      .post(
        "https://codeprotect.app/api/LoginP",
        {
          IDUtente: cleanedIDUtenteString,
          NomeSito: NomeSito,
          URL: URL,
          Email: Email,
          PasswordL: Password,
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Login salvato con successo") {
          setMessage("Dati inseriti con successo.");
        } else {
          // Il login non è stato effettuato con successo
          setErrorMessage("Qualcosa é andato storto. Reinserire i dati");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
      });
  };

 //Funzione dei post delle password alla api corrispondente
  const handlePasswordSubmit = () => {
    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, "");

    if (!NomeP || !Password) {
      setErrorMessage("Tutti i campi sono obbligatori.");
      return;
    }

    axios
      .post(
        "https://codeprotect.app/api/PasswordP",
        { IDUtente: cleanedIDUtenteString, NomeP: NomeP, Password: Password },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Password salvata con successo") {
          setMessage("Dati inseriti con successo.");
        } else {
          // Il login non è stato effettuato con successo
          setErrorMessage("Qualcosa é andato storto. Reinserire i dati");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
      });
  };

//Funzione dei post delle note alla api corrispondente
  const handleNotaSubmit = () => {
    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{()}]/g, "");

    if (!NomeNota || !Nota) {
      setErrorMessage("I campi sono obbligatori.");
      return;
    }

    axios
      .post(
        "https://codeprotect.app/api/NoteP",
        { IDUtente: cleanedIDUtenteString, NomeNota: NomeNota, Nota: Nota },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Nota salvata con successo") {
          setMessage("Dati inseriti con successo.");
        } else {
          // Il login non è stato effettuato con successo
          setErrorMessage("Qualcosa é andato storto. Reinserire i dati");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error);
      });
  };

  // Funzione per gestire la modifica dei dati dell'account utente
  const handleModify = () => {
    if (!IDUnivoco) {
      alert("Inserisci l'ID univoco prima di inviare la modifica.");
      return;
    }

    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{}]/g, "");

    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/ModificaDatiAccesso",
        {
          IDUtente: cleanedIDUtenteString,
          NewData: {
            Nome: Nome,
            Cognome: Cognome,
            EmailU: EmailU,
            PasswordU: PasswordU,
          },
          IDUnivoco: IDUnivoco, // Passa l'ID univoco al backend
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (
          response.data.message === "Dati dell'utente aggiornati con successo"
        ) {
          setMessage("Invio effettuato con successo.");
          // Reinizializza gli stati di modifica
          setIsModifying(false);
          // Reinizializza anche l'ID univoco
          setIDUnivoco("");
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

  // Funzione per gestire la cancellazione dei dati dell'utente
  const handleDelete = () => {
    if (!IDUnivoco) {
      alert("Inserisci l'ID univoco prima di inviare la modifica.");
      return;
    }

    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{}]/g, "");

    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/RimuoviAccount",
        {
          IDUtente: cleanedIDUtenteString,
          IDUnivoco: IDUnivoco, // Passa l'ID univoco al backend
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Utente eliminato con successo") {
          navigate("/", { replace: true });
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

  // Funzione per gestire l'esportazione dei dati utente
  const handleExport = () => {
    if (!IDUnivoco) {
      alert("Inserisci l'ID univoco prima di inviare la modifica.");
      return;
    }

    const IDUtenteString = JSON.stringify(IDUtente);
    const parts = IDUtenteString.split(":");
    const cleanedIDUtenteString = parts[1].replace(/[{}]/g, "");

    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/EsportaDati",
        {
          IDUtente: cleanedIDUtenteString,
          IDUnivoco: IDUnivoco, // Passa l'ID univoco al backend
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Email inviata con successo!") {
          setMessage("Email inviata con successo!");
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

 //Funzione per la generazione di password sicura
  const handleGeneratePassword = async () => {
    try {
      // Invia la richiesta al backend
      const response = await axios.get(
        `https://codeprotect.app/api/GeneraPassword`
      );
      const newPassword = response.data;

      setPassword(newPassword);

      console.log("Nuova password generata:", newPassword);
    } catch (error) {
      console.error("Errore durante il recupero della password:", error);
    }
  };

 // Funzione per gestire la modifica dei dati di login
  const handleLoginModify = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/ModificaLogin",
        {
          IDLogin: selectedLoginData.IDLogin,
          NewData: {
            NomeSito: NomeSito,
            PasswordL: Password,
            URL: URL,
            Email: Email,
          },
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (
          response.data.message === "Dati del login aggiornati con successo"
        ) {
          setMessage("Invio effettuato con successo.");
          // Reinizializza gli stati di modifica
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

 // Funzione per gestire la cancellazione dei dati di login
  const handleLoginDelete = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/RimuoviLogin",
        {
          IDLogin: selectedLoginData.IDLogin,
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Login eliminato con successo") {
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

 // Funzione per gestire la modifica delle password
  const handlePasswordModify = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/ModificaPassword",
        {
          IDPassword: selectedPasswordData.IDPassword,
          NewData: {
            NomeP: NomeP,
            Password: Password,
          },
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (
          response.data.message ===
          "Dati della password aggiornati con successo"
        ) {
          setMessage("Invio effettuato con successo.");
          // Reinizializza gli stati di modifica
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };
 
  // Funzione per gestire la cancellazione delle password
  const handlePasswordDelete = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/RimuoviPassword",
        {
          IDPassword: selectedPasswordData.IDPassword,
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Password eliminata con successo") {
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

 // Funzione per gestire la modifica delle note
  const handleNotaModify = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/ModificaNota",
        {
          IDNota: selectedNoteData.IDNota,
          NewData: {
            NomeNota: NomeNota,
            Nota: Nota,
          },
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (
          response.data.message === "Dati della nota aggiornati con successo"
        ) {
          setMessage("Invio effettuato con successo.");
          // Reinizializza gli stati di modifica
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };

 // Funzione per gestire la cancellazione delle note
  const handleNotaDelete = () => {
    // Invia la richiesta di modifica al backend
    axios
      .post(
        "https://codeprotect.app/api/RimuoviNota",
        {
          IDNota: selectedNoteData.IDNota,
        },
        { timeout: 15000 }
      )
      .then((response) => {
        console.log("Risposta dal server:", response.data.message);

        if (response.data.message === "Nota Eliminata con successo") {
          setIsModifying(false);
        } else {
          setErrorMessage("Errore nella modifica dei dati. Riprovare");
        }
      })
      .catch((error) => {
        console.error("Errore durante la modifica:", error);
      });
  };


  return (
    <SpecificheContainer>



     {/* Bottone Inserimento nuova password per far comparire form setta areinsertpassword a true */}
      {arePasswordSalvate && (
        <FormButton
          onClick={(e) => {
            e.preventDefault();
            setAreInsertPassword(true);
          }}
        >
          Inserisci una nuova password
        </FormButton>
      )}

      {/* Visualizza le password seguendo le condizioni e eliminando altri menu, permette la modifica e la cancellazione delle password */}
      {arePassword && selectedPasswordData && !areLoginSalvati && !areNoteSalvate && !areInsertPassword && !areExport && !areAccount && !areImpostazioni && (
          <div>
          <SavedItemsWrapper>
                  <SingleResult>
                  <EmojiStyle>⚪</EmojiStyle>
                  <p onClick={() => copyToClipboard(selectedPasswordData.NomeP)}>
                    {selectedPasswordData.NomeP}
                  </p></SingleResult>
                
                  <SingleResult>           
                  <EmojiStyle>🔑</EmojiStyle>
                  <p onClick={() => copyToClipboard(selectedPasswordData.Password)}>
                  {selectedPasswordData.Password}
                  </p></SingleResult>

                  {/* Bottone modifica password */}
                  
                  {!isModifying && (
                  <FormButton onClick={() => {setIsModifying(true);}}>Modifica</FormButton>
            )}
                    {copied && <BoldFont>👌 Copiato!</BoldFont>}
          
          </SavedItemsWrapper>
     

            {isModifying && (

              // Form di modifica
              <SavedItemsWrapper ref={formRef}>
                
                <SingleResult>
                <EmojiStyle>⚪</EmojiStyle>
                <FormInput
                  type="text"
                  value={NomeP}
                  onChange={(e) => setNomeP(e.target.value)}
                  placeholder="Nome"
                />

                </SingleResult>

                <SingleResult>
                <EmojiStyle>🔑</EmojiStyle>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  title="Inserisci una password valida"
                />
                </SingleResult>
                
                
                <p>
                  <input
                    type="checkbox"
                    onClick={togglePasswordVisibility}
                    checked={showPassword}
                  />
                  Mostra la Password
                </p>
                <FormButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleGeneratePassword();
                  }}
                >
                  Genera una password sicura
                </FormButton>
                <FormButton  onClick={(e) => {
                    e.preventDefault();
                    handlePasswordModify();
                    formRef.current.reset();
                  }}>
                  Invia la modifica
                </FormButton>
                <DeleteButton onClick={(e) => {
                    e.preventDefault(); handlePasswordDelete(); formRef.current.reset();}}>
                  🛑 Cancella il tuo login 🛑
                </DeleteButton>
                </SavedItemsWrapper>
            )}
          </div>
        )}

      {/* Form Inserimento nuova password compare solo se insertpassword é true */}
      {areInsertPassword && (
  <FormWrapper onSubmit={handlePasswordSubmit} ref={formRef}>
    <AllInputContainer>
      <SingleInput>
        <FormLabel htmlFor="nomepassword">⚪</FormLabel>
        <FormInput
          id="nomepassword"
          type="text"
          value={NomeP}
          onChange={(e) => setNomeP(e.target.value)}
          placeholder="Nome della Password"
          required
        />
      </SingleInput>

      <SingleInput>
        <FormLabel htmlFor="passwordp">🔑</FormLabel>
        <FormInput
          id="passwordp"
          type={showPassword ? "text" : "password"}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          title="Inserisci una password valida"
        />
      </SingleInput>
    </AllInputContainer>

    <p>
      <input
        type="checkbox"
        onClick={togglePasswordVisibility}
        checked={showPassword}
      />
      Mostra la password
    </p>

    <AllInputContainer>
      <FormButton
        onClick={(e) => {
          e.preventDefault();
          handleGeneratePassword();
        }}
      >
        Genera una password sicura
      </FormButton>

      <FormButton
        onClick={(e) => {
          e.preventDefault();
          handlePasswordSubmit();
          formRef.current.reset();
        }}
      >
        Invia
      </FormButton>
    </AllInputContainer>
  </FormWrapper>
)}


      {/* Bottone Inserimento nuova nota per far comparire form setta areinsertnota a true */}
      {areNoteSalvate && (
        <FormButton
          onClick={(e) => {
            e.preventDefault();
            setAreInsertNota(true);
          }}
        >
          Inserisci una nuova nota
        </FormButton>
      )}

      {/* Visualizza le note seguendo le condizioni e eliminando altri menu, permette la modifica e la cancellazione delle note */}
      {areNota && selectedNoteData && !areLoginSalvati && !arePasswordSalvate && !areInsertNota && !areExport && !areAccount && !areImpostazioni && (
  <div>
    <SavedItemsWrapper>
      <SingleResult>
        <EmojiStyle>⚪</EmojiStyle>
        <p onClick={() => copyToClipboard(selectedNoteData.NomeNota)}>
          {selectedNoteData.NomeNota}
        </p>
      </SingleResult>

      <SingleResult>
        <EmojiStyle>📜</EmojiStyle>
        <p onClick={() => copyToClipboard(selectedNoteData.Nota)}>
          {selectedNoteData.Nota}
        </p>
      </SingleResult>

      {/* Bottone modifica */}
      {!isModifying && (
        <FormButton
          onClick={() => {
            setIsModifying(true);
          }}
        >
          Modifica Nota
        </FormButton>
      )}
      {copied && <BoldFont>👌 Copiato!</BoldFont>}
    </SavedItemsWrapper>

    {isModifying && (
      // Form di modifica
      <SavedItemsWrapper ref={formRef}>
        
          <SingleResult>
            <EmojiStyle>⚪</EmojiStyle>
            <FormInput
              type="text"
              value={NomeNota}
              onChange={(e) => setNomeNota(e.target.value)}
              placeholder="Titolo"
            />
          </SingleResult>

          <SingleResult>
            <EmojiStyle>📜</EmojiStyle>
            <textarea
              value={Nota}
              id="nota"
              onChange={(e) => setNota(e.target.value)}
              placeholder="Nota"
              required
              title="Inserisci Contenuto Nota"
              style={{ width: '100%', height: '80px', borderRadius: '3px' }}
            />
          </SingleResult>

          <FormButton
            onClick={(e) => {
              e.preventDefault();
              handleNotaModify();
              formRef.current.reset();
            }}
          >
            Invia la modifica
          </FormButton>
          <FormButton
            
            onClick={(e) => {
              e.preventDefault();
              handleNotaDelete();
              formRef.current.reset();
            }}
          >
            🛑 Cancella nota 🛑
          </FormButton>
        
      </SavedItemsWrapper>
    )}
  </div>
)}

      {/* Form Inserimento nuova nota compare solo se insertnota é true */}
      {areInsertNota && (
        <FormWrapper onSubmit={handleNotaSubmit} ref={formRef}>
          <SingleResult>
            <EmojiStyle>⚪</EmojiStyle>
            <FormInput
              type="text"
              id="nomenota"
              value={NomeNota}
              onChange={(e) => setNomeNota(e.target.value)}
              placeholder="Nome"
              required
            />
          </SingleResult>

          <SingleResult>
          <EmojiStyle>📜</EmojiStyle>
            <textarea
              value={Nota}
              id="nota"
              onChange={(e) => setNota(e.target.value)}
              placeholder="Nota"
              required
              title="Contenuto nota..."
              style={{width: '100%', height: '80px', borderRadius: '3px'}}
            />
          </SingleResult>

          <FormButton
            onClick={(e) => {
              e.preventDefault();
              handleNotaSubmit();
              formRef.current.reset()
            }}
          >
            Invia
          </FormButton>
        </FormWrapper>
      )}


    {/* Bottone Inserimento nuovo login per far comparire form setta areinsertlogin a true */}
{areLoginSalvati && (
  <FormButton onClick={(e) => { e.preventDefault(); setAreInsertLogin(true)}}>Inserisci Nuovo login</FormButton> 
)}

{/* Visualizza il login seguendo le condizioni e eliminando altri menu permette la modifica e la cancellazione del login */}
{areLogin && selectedLoginData && !arePasswordSalvate && !areNoteSalvate && !areInsertLogin && !areExport && !areAccount && !areImpostazioni && (
  <div>
    <SavedItemsWrapper>
      <p onClick={() => copyToClipboard(selectedLoginData.NomeSito)}>
         {selectedLoginData.NomeSito}
      </p>
      <p onClick={() => copyToClipboard(selectedLoginData.URL)}>
         {selectedLoginData.URL}
      </p>
      <p onClick={() => copyToClipboard(selectedLoginData.Email)}>
         {selectedLoginData.Email}
      </p>
      <p onClick={() => copyToClipboard(selectedLoginData.PasswordL)}>
         {selectedLoginData.PasswordL}
      </p>
              
      {/* Bottone modifica CHE CAUSA PROBLEMI!!
      {!isModifying && (
        <FormButton onClick={() => setIsModifying(true)}>Modifica</FormButton>
      )}
 */}
      {/* Notifica di modifica */}
      {copied && <BoldFont> Copiato!</BoldFont>}
    </SavedItemsWrapper>         

    {isModifying && (
      // Form di modifica
      <FormWrapper ref={formRef}>
        <FormInput
          type="text"
          value={NomeSito}
          onChange={(e) => setNomeSito(e.target.value)}
          placeholder="Nome"
        />
                
        <FormInput
          type="text"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          placeholder="URL"
        />

        <FormInput
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <FormInput
          type={showPassword ? "text" : "password"}
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          title="Inserisci una password valida"
        />

        {/* Checkbox mostra password. */}
        <TestoBold>
          <input
            type="checkbox"
            onClick={togglePasswordVisibility}
            checked={showPassword}
            style={TestoBold}
          />
          Mostra la Password
        </TestoBold>

        <FormButton
          onClick={(e) => {
            e.preventDefault();
            handleGeneratePassword();
          }}
        >
          Genera una password sicura
        </FormButton>
                
        <FormButton
          onClick={(e) => {
            e.preventDefault();
            handleLoginModify();
            formRef.current.reset();
          }}
        >
          Invia la modifica
        </FormButton>

        <FormButton
          onClick={(e) => {
            e.preventDefault();
            handleLoginDelete();
            formRef.current.reset();
          }}
        >
          🛑 Cancella il tuo login 
        </FormButton>
      </FormWrapper>
    )}
  </div>
)}

      {/* Form Inserimento nuovo login compare solo se insertlogin é true */}
      {areInsertLogin && (
        <FormWrapper onSubmit={handleLoginSubmit} ref={formRef}>  
          
        <AllInputContainer>
          
          <SingleInput>
            <FormLabel htmlFor="nomesito">🌐</FormLabel>
            <FormInput
              id="nomesito"
              type="text"
              value={NomeSito}
              onChange={(e) => setNomeSito(e.target.value)}
              placeholder="Nome del sito"
              required
            />
          </SingleInput>

          <SingleInput>
            <FormLabel htmlFor="url">🔗</FormLabel>
            <FormInput
              id="url"
              type="text"
              value={URL}
              onChange={(e) => setURL(e.target.value)}
              placeholder="URL"
              required
            />
          </SingleInput>

          <SingleInput>
            <FormLabel htmlFor="emails">📧</FormLabel>
            <FormInput
              type="email"
              id="emails"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-MAIL"
              required
              pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
              title="Inserisci un indirizzo email valido"
            />
          </SingleInput>

          <SingleInput>
            <FormLabel htmlFor="passwords">🔑</FormLabel>
            <FormInput
              type={showPassword ? "text" : "password"}
              value={Password}
              id="passwords"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              title="Inserisci una password valida"
            />
            </SingleInput>
            </AllInputContainer>
            <p>
              <input
                type="checkbox"
                onClick={togglePasswordVisibility}
                checked={showPassword}
              />
              Mostra la Password
            </p>
          
        
        <AllInputContainer>
          <FormButton
            onClick={(e) => {
              e.preventDefault();
              handleGeneratePassword();
              formRef.current.reset();
            }}
          >
            Genera una password 
          </FormButton>
          <FormButton
            onClick={(e) => {
              e.preventDefault();
              handleLoginSubmit();
              formRef.current.reset();
            }}
          >
            Invia
          </FormButton>
        </AllInputContainer>
        
        </FormWrapper>
      )}


     {/* Visualizza i dati dell account seguendo le condizioni e eliminando altri menu, permette la modifica e la cancellazione dei dati dell account */}
      {areAccount && areImpostazioni && !areLoginSalvati && !arePasswordSalvate && !areNoteSalvate && !areExport && !areNota && (
          <div>
            <div>
              {selectedAccountData.map((data, index) => (
                <div key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SavedItemsWrapper>
                      <SingleResult>
                      <EmojiStyle>🔸</EmojiStyle>
                      <p>Nome: {data.Nome}</p>
                      </SingleResult>

                      <SingleResult>
                      <EmojiStyle>🔹</EmojiStyle>
                      <p>Cognome: {data.Cognome}</p>
                      </SingleResult>



                      <SingleResult>
                      <EmojiStyle>📧</EmojiStyle>
                      <p>Email: {data.EmailU}</p>
                      </SingleResult>

                      {!isModifying && (
                      <FormButton
                        onClick={() => {
                          setIsModifying(true);
                        }}
                      >
                        Modifica
                      </FormButton>
                    )}
                    </SavedItemsWrapper>

                    
                  </div>


                  {isModifying && (
                    // Form di modifica
                   
                    <SavedItemsWrapper>
                      <FormInput
                        type="text"
                        value={Nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                      />
                      <FormInput
                        type="text"
                        value={Cognome}
                        onChange={(e) => setCognome(e.target.value)}
                        placeholder="Cognome"
                      />
                      <FormInput
                        type="email"
                        value={EmailU}
                        onChange={(e) => setEmailU(e.target.value)}
                        placeholder="Email"
                      />
                      <FormInput
                        type="password"
                        value={PasswordU}
                        onChange={(e) => setPasswordU(e.target.value)}
                        placeholder="Password"
                      />
                     
                      
                        <TestoBold>
                          Prima di procedere, inserisci l&apos;ID Univoco:
                        </TestoBold>
                        <FormInput
                          type="text"
                          value={IDUnivoco}
                          onChange={(e) => setIDUnivoco(e.target.value)}
                          placeholder="ID Univoco"
                        />
                      

                      <FormButton onClick={(e) => {
                    e.preventDefault(); handleModify(); formRef.current.reset()}}>
                        Invia la modifica
                      </FormButton>
                      <DeleteButton onClick={(e) => {
                    e.preventDefault(); handleDelete(); formRef.current.reset()}}>
                        Cancella il tuo account
                      </DeleteButton>
                      </SavedItemsWrapper>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


       {/* Si occupa dell'esportazione delle password facendo inserire all'user il codice univoco, seguendo le condizioni e eliminando gli altri menu */}
      {areExport && areImpostazioni && !areLoginSalvati && !arePasswordSalvate && !areNoteSalvate && !areAccount && !areNota && (
          <SavedItemsWrapper ref={formRef}>
            <p>Esporta tutti i tuoi dati per utilizzarli offline.</p>

            <FormLabel>
              Prima di procedere con l&apos;esportazione, inserisci l&apos;ID
              Univoco:
            </FormLabel>
            
            <FormInput
              type="text"
              value={IDUnivoco}
              onChange={(e) => setIDUnivoco(e.target.value)}
              placeholder="ID Univoco"
            />

            <FormButton  onClick={(e) => {
                    e.preventDefault();handleExport();
                    formRef.current.reset();}}>
              Richiedi l&apos;esportazione
            </FormButton>
          </SavedItemsWrapper>
        )}



      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
      )}

      {Message && (
        <div style={{ color: "black", marginTop: "10px" }}>{Message}</div>
      )}

    </SpecificheContainer>
  );
}

Specifiche.propTypes = {
  areLoginSalvati: PropTypes.bool.isRequired,
  arePasswordSalvate: PropTypes.bool.isRequired,
  areNoteSalvate: PropTypes.bool.isRequired,
  areImpostazioni: PropTypes.bool.isRequired,
  IDUtente: PropTypes.string.isRequired,
  selectedLoginData: PropTypes.string,
  selectedAccountData: PropTypes.string,
  areLogin: PropTypes.bool.isRequired,
  areAccount: PropTypes.bool.isRequired,
  setAreModify: PropTypes.func.isRequired,
  areModify: PropTypes.bool.isRequired,
  areExport: PropTypes.bool.isRequired,
  areDelete: PropTypes.bool.isRequired,
  arePassword: PropTypes.bool.isRequired,
  selectedPasswordData: PropTypes.string,
  areNota: PropTypes.bool.isRequired,
  selectedNoteData: PropTypes.string,
  areInsertLogin: PropTypes.bool.isRequired,
  areInsertPassword: PropTypes.bool.isRequired,
  areInsertNota: PropTypes.bool.isRequired,
  setAreInsertLogin: PropTypes.func.isRequired,
  setAreInsertPassword: PropTypes.func.isRequired,
  setAreInsertNota: PropTypes.func.isRequired,
};

export default Specifiche;
