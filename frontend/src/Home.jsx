/* TODO:
TODO Disattivare animazione gradient su mobile.
TODO Forzare grandezza alcuni elementi sul viewport mobile (escono fuori orizzontalmente)
*/

/* Libraries */
import {useEffect} from 'react';
import lottie from "lottie-web/build/player/lottie_light"; /* DA IMPLEMENTARE DYNAMIC IMPORT. */
import { Link } from 'react-router-dom';
import Feature1 from './Feature1';
import Feature2 from './Feature2';
import styled, {keyframes} from 'styled-components';
import ScrambleText from './ScrambledText'; // Animazione paragrafo sotto il logo.

/* JSX Dario Files  */
import RegisterButton from './registerButton';

/* Media import */
import image from "../media/icons/danger01.svg";
//import logo from "../media/logo/logoFullWhite.svg"
import logoAnimated from "../media/animations/logoFullLineAnimated.json"

/* animazione gradient BG*/
const GradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

/*Animazione Glow */
const GradientUnderglow = keyframes `
0% {
  background-position: 0% 50%;
}
100% {
  background-position: 200% 50%;
    }
`
const Glowing = keyframes `
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
`

const WarningBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 657px;
  
  background-color: #f2f2f2;
  color: red;
  border: 2px solid red;
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 10px;  
  
  @media (max-width: 768px) {
    width: 90%; /* Set the width to 100% on screens with a maximum width of 768px (adjust the value as needed) */
    flex-direction: column;
    text-align: justify;
  }

`;



const WarningIcon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
`;

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  /*padding: 3rem 0;*/
  font-family: 'Roboto', sans-serif;
  
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


const LottieLogo = () => {

  useEffect(() => {
    // Load the Lottie animation
    const animation = lottie.loadAnimation({
      container: document.getElementById('LottieLogoContainer'),
      animationData: logoAnimated,
      loop: false,
      autoplay: true,
      speed: 0.5,
      renderer: "svg",
    });
    
    // Clean up the animation when the component unmounts
    return () => {
      animation.destroy();
    };
}, []); // The empty dependency array ensures this effect runs only once

return (
  <div id="LottieLogoContainer" style={{LottieStyle}}>
    {/* This is where the Lottie animation will be rendered */}
  </div>
);
};

const LottieStyle = styled.div`
width: '700px', 
margin: '0 auto',
@media (max-width: 768px) {
  width: 100%; /* Set the width to 100% on screens with a maximum width of 768px (adjust the value as needed) */
`

const LottieLogoContainer = styled.div`
  width: 700px; /* Set the width of the Lottie animation container */
  margin: 0 auto; /* Center horizontally */  
  align-items: center;
  @media (max-width: 768px) {
    width: 100%; /* Set the width to 100% on screens with a maximum width of 768px (adjust the value as needed) */
 
`;

const LogoContainer = styled.div`
  color: white;
  background-color: black;
  font: white;
  width: fit-content;
  border-radius:10px;
  padding: 20px;
  margin: 0 auto; /* Center horizontally */  
  margin-bottom: 0em;
  align-items: center;
}` 

const FeatureContainer = styled.div`
  color: #1a1a1a;
  text-align: center;
  padding: 3rem 0;
  border-radius:10px;

  /*Animated gradient BG */
  background: linear-gradient(300deg,#006D92,#4E006F,#000043);
  background-size: 180% 180%;

  /* Gradient is animated only on > mobile */
  @media (min-width: 769px) {
    animation: ${GradientAnimation} 10s ease infinite;
  }

  @media (max-width: 780px) {
    
  }



  /*End gradient BG*/
`
const ParagraphContainer = styled.div`
  display:flex;  
  flex-direction: row; /* Items are horizontal */
  justify-content: center;  /* Center horizontally */ 
  align-items: center;  /* Center vertically */
  gap: 20px; /* Distance between items */
  padding-bottom: 15px;

  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  font-weight: bolder;
  text-transform: uppercase;
  white-space: nowrap;
  text-shadow: 0 2px 2px rgba(#000, 0.9);
  color: black;

  @media (max-width: 768px) {
    width: 100%; /* Set the width to 100% on screens with a maximum width of 768px (adjust the value as needed) */
  }

  /* Add word wrap styles for text within this container */
  p {
    white-space: normal; /* Allow text to wrap to the next line */
    overflow-wrap: break-word; /* Enable word wrapping within words */
  }






`

const Home = () => {
  return (
    <HeroContainer>
            <WarningBox>
              {/*<WarningIcon src={image} alt="Danger Icon"/> */}
              <div style={{fontweight: 'bolder',color:'black'}}>🛑 ATTENZIONE 🛑</div>
              <div style={{color: 'black'}}>Questo è un progetto universitario in fase di sviluppo. <br />
              Non fornisce le massime misure di sicurezza.</div>
            </WarningBox>

            {/* Animated Logo */}
            <LottieLogoContainer><LottieLogo /></LottieLogoContainer>
            

            {/* Paragrafo*/}
            <ParagraphContainer>
                <RegisterButton text="Iscriviti" linkTo="/Registrazione"
                preW='150px' postW='160px' preH='50px' postH='55px' fontSize='1.5rem'/>

                <ScrambleText text=" 🔐 per proteggere i tuoi codici unici." speed='10' overdrive={true}/>
            </ParagraphContainer>
            
            {/*Bottone registrazione */}
            {/*<GlowHoverButton to="./Registrazione">Registrati</GlowHoverButton>*/}
           
            



            <FeatureContainer>
              <Feature1 />
              <Feature2 />
            </FeatureContainer>

    </HeroContainer>
  );
};

export default Home;