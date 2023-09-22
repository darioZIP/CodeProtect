
import styled from 'styled-components';
import image4 from "../media/icons/password01.svg";
import image5 from "../media/icons/cloud01.svg";
import image6 from "../media/icons/secure02.svg";

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;


/*
Animazione CSS
*/


const FeatureBox = styled.div`
  flex: 0 0 17%;
  background-color: #f2f2f2;
  text-align: justify;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex: 0 0 80%;
  }
`;

const FeatureHeading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
display: block;
margin: 0 auto; /* Allinea al centro orizzontalmente */
width: 100px;
height: auto;
  
`;

const Feature2 = () => {
  return (
    <FeatureContainer>
      <FeatureBox>
      <Image src={image4} alt="Password Icon"/>
        <FeatureHeading>Genera le tue Password</FeatureHeading>
        <p>
          Accedi in maniera facile e veloce a tutti i tuoi account online.
          Generando delle password sicure.
        </p>
        <p>
          Avrai la possibilità di generare password di diversa difficoltà e
          lunghezza in base alle tue esigenze!
        </p>
      </FeatureBox>

      <FeatureBox>
      <Image src={image5} alt="Cloud Icon"/>

        <FeatureHeading>Multipiattaforma</FeatureHeading>
        <p>
          L&apos;applicazione è compatibile con tutti i dispositivi in grado di
          visualizzare pagine internet. (iOS, Android, Windows...)
        </p>
      </FeatureBox>

      <FeatureBox>
      <Image src={image6} alt="Secure Icon"/>
        <FeatureHeading>Sicurezza nell&apos;esportazione</FeatureHeading>
        <p>
          Con Codeprotect grazie al tuo codice univoco avrai una maggiore
          sicurezza nell&apos;esportazione dei tuoi dati.
        </p>
        <p>
          Il codice univoco ti verrà inviato via mail e sarà a tua disposizione
          per le operazioni che richiedono una sicurezza maggiore.
        </p>
      </FeatureBox>
    </FeatureContainer>
  );
};

export default Feature2;
