import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #000000;
  color: #ffffff;
  text-align: center;
  padding: 1rem 2rem;
  font-family: 'Roboto', sans-serif; 
  border-radius: 10px;
  margin-top: 50px;

  
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 15px;
  }


`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Nylrio Code Protect. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
