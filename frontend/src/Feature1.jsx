import ScrambleText from './ScrambledText'; // Animazione paragrafo sotto il logo.
import styled from 'styled-components';

import image from "../media/icons/install.svg";
import image2 from "../media/icons/note03.svg";
import image3 from "../media/icons/offline04.svg";



const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

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
  font-weight: bold;
  margin-bottom: 1rem;
  text-shadow: rgba(54, 54, 54, 0.18) 1px 0 90px;
`;

const Image = styled.img`
display: block;
margin: 0 auto; /* Allinea al centro orizzontalmente */
width: 100px;
height: auto;
  
`;


const Feature1 = () => {
  return (
    <FeatureContainer>
      <FeatureBox>
      <Image src={image} alt="Install Icon"/>


        <FeatureHeading>
        <ScrambleText text="Nessuna installazione." speed='7' overdrive={true}/>
        </FeatureHeading>


        <p><ScrambleText text="CodeProtect è un&apos;applicazione web." speed="6" overdrive={true}/></p>
        <p><ScrambleText text="Non necessita di alcuna installazione." speed="6" overdrive={true}/></p>
      </FeatureBox>

      <FeatureBox>
      <Image src={image2} alt="Note Icon"/>
        <FeatureHeading>Crea le tue Note Private</FeatureHeading>
        <p>Possibilità di inserire informazioni aggiuntive per ogni account.</p>
        <p>Le note vengono criptate e saranno leggibili soltanto da te.</p>
      </FeatureBox>

      <FeatureBox>
      <Image src={image3} alt="Offline Icon"/>
        <FeatureHeading>Accedi ai tuoi dati offline</FeatureHeading>
        <p>Visualizza i tuoi dati salvati, senza una connessione ad internet.</p>
      </FeatureBox>
    </FeatureContainer>
  );
};

export default Feature1;
