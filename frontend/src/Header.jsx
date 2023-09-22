import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, {css} from "styled-components";
import logo from "../media/logo/logoCPshield.svg";
import PropTypes from "prop-types";

const HeaderContainer = styled.header`
  border-radius: 10px;
  background-color: #000000;
  color: #ffffff;
  padding: 1rem 2rem;
  
  
  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 1.5rem; /* Set a fixated height. */
  margin-bottom: 50px;
  
  /* STICKY HEADER*/
  position: sticky;
  top: 0px;
  z-index: 5;


  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 15px;
  }

  box-shadow: 
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;


`;

const MainMenu = styled.div`
font-family: "Roboto", sans-serif;
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
align-items: center;
font-weight: bold;
@media (max-width: 768px) {
  margin-bottom: 0rem; /*WTFFFFF, causes A LOT of margin*/
}
`


const Logo = styled.img`
  width: 200px;
  cursor: pointer;
  vertical-align: middle;

  @media (max-width: 768px) {
    margin-bottom: 0rem; /*Why the fuck would I use this???*/
  }
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

const StyledMenuList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    display: ${(props) => (props.isMenuOpen ? "block" : "none")};
  }
`;

// Container di ogni bottone header
const MenuItem = styled.li`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  


  margin-left: 1rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  

  @media (max-width: 768px) {
    margin: 0;
    margin-top: 1rem;
    font-size: 0.6rem;
    gap: 20px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem; /* Adjust the font size for smaller screens */
    gap: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 0px;
  }


  /* Add the hover-underline-animation styles using the css helper */
  ${css`
    display: inline-block;
    position: relative;
    color: white;
    transition: font-size 0.2s ease; /* Add a smooth transition for font size change */
  `}

  &::after {
    color: white;
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    font-size: 120%;
  }

  &:hover::after {    
    transform: scaleX(1.0); /* Non toccare, ingrandisce linea sotto */
    transform-origin: bottom top;
  }

  /* Fa in modo che ogni link non abbia colore preset viola */
  a:-webkit-any-link {
    text-decoration: none;
    color: inherit;
  }
`;

const MenuButton = styled.button`
  text-decoration: none; /* To remove hyperlink color */
  display: none;
  background: transparent;
  border: 1px solid #000000;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  text-transform: uppercase;
  font-weight: bold;
`;

const Header = ({
  isLoggedIn,
  setIsLoggedIn,  
  setAreLoginSalvati,
  setArePasswordSalvate,
  setAreNoteSalvate,
  setAreImpostazioni,
  setIDUtente,
  setAreInsertLogin,
  setAreInsertPassword,
  setAreInsertNota,

}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      console.log("Pre-redirect login:", isLoggedIn);
    } else {
      navigate("/", { replace: true });
    }
  };

const handleLoginClick= () => {
        setAreLoginSalvati(true)
        setArePasswordSalvate(false);
        setAreNoteSalvate(false);
        setAreImpostazioni(false);
        setAreInsertLogin(false),
        setAreInsertPassword(false),
        setAreInsertNota(false),
        setIsMenuOpen(true);
      }   
      
const handlePasswordClick =() => {

        setAreLoginSalvati(false);
        setArePasswordSalvate(true);        
        setAreNoteSalvate(false);
        setAreImpostazioni(false);
        setAreInsertLogin(false),
        setAreInsertPassword(false),
        setAreInsertNota(false),     
        setIsMenuOpen(true);
    }

const handleNoteClick =() => {
        setAreLoginSalvati(false);
        setArePasswordSalvate(false);
        setAreNoteSalvate(true);        
        setAreImpostazioni(false);
        setAreInsertLogin(false),
        setAreInsertPassword(false),
        setAreInsertNota(false), 
        setIsMenuOpen(true);
    }
    
const handleImpostazioniClick=() => {
        setAreLoginSalvati(false);
        setArePasswordSalvate(false);
        setAreNoteSalvate(false);
        setAreImpostazioni(true);
        setAreInsertLogin(false),
        setAreInsertPassword(false),
        setAreInsertNota(false),         
        setIsMenuOpen(true);

}

const handleLogout = () => {
  navigate("/", {replace: true});
  setIsLoggedIn(false);
  setIDUtente(null); // Resetta il valore di IDUtente al logout
  console.log("Logout effettuato con successo");
};


  return (
    <HeaderContainer>
      <MainMenu>
      
      <LogoLink
      to="/"
  onClick={(e) => {
    if (isLoggedIn) {
      e.preventDefault(); // Prevent default behavior only when the menu is open
      toggleMenu(); // Close the menu
      handleLogout(); // Handle the logo click action
    }

    else {
      handleLogoClick();
    }
  }}
>
  <Logo src={logo} alt="Nylrio Code Protect" />
</LogoLink>

      <MenuButton onClick={toggleMenu}>Menu</MenuButton>
      </MainMenu>
      <StyledMenuList isMenuOpen={isMenuOpen}>
        {isLoggedIn ? (
          <>
            <MenuItem >
              <Link onClick={(e) => { e.preventDefault(); handleLoginClick("loginSalvati");toggleMenu();}}>
                Login salvati
              </Link>
            </MenuItem>
            <MenuItem>
              <Link onClick={(e) => { e.preventDefault(); handlePasswordClick("passwordSalvate");toggleMenu();}}>
                Password salvate
              </Link>
            </MenuItem>
            <MenuItem>
              <Link  onClick={(e) => { e.preventDefault(); handleNoteClick("noteSalvate");toggleMenu();}}>
                Note salvate
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/Impostazioni" onClick={(e) => { e.preventDefault(); handleImpostazioniClick("impostazioni");toggleMenu();}}>
                Impostazioni
              </Link>
            </MenuItem>
            <MenuItem>
              <Link onClick={(e) => { e.preventDefault(); handleLogout();toggleMenu();}}>Logout</Link>
            </MenuItem>
          </>
        ) : (
          (location.pathname === "/" ||
            location.pathname === "/Accesso" ||
            location.pathname === "/Registrazione") && (
            <>
              <MenuItem>
                <Link to="/Accesso">Accedi</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/Registrazione">Iscriviti</Link>
              </MenuItem>
            </>
          )
        )}
      </StyledMenuList>
    </HeaderContainer>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired, 
  setAreLoginSalvati: PropTypes.func.isRequired,
  setArePasswordSalvate: PropTypes.func.isRequired,
  setAreNoteSalvate: PropTypes.func.isRequired,
  setAreImpostazioni: PropTypes.func.isRequired,
  setIDUtente: PropTypes.func.isRequired,
  setAreInsertLogin: PropTypes.func.isRequired,
  setAreInsertPassword: PropTypes.func.isRequired,
  setAreInsertNota: PropTypes.func.isRequired,
};

export default Header;
