import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = styled.div`
  width: 250px;
  background-color: #000000;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
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


const Impostazioni = () => {

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar>
          <MenuList>
            <MenuItem>
              <Link to="/Account">Account Utente</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/EsportaDati">Esporta tutti i tuoi dati</Link>
            </MenuItem>
          </MenuList>
        </Sidebar>
      </div>
    </div>
  );
};

export default Impostazioni;
