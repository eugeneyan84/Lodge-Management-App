import styled from 'styled-components';
import { useDarkMode } from '../context/ColourModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Logo = () => {
  const { isDarkMode } = useDarkMode();
  const logoSrc = isDarkMode ? '/lodge-dark.png' : '/lodge-light.png';
  return (
    <StyledLogo>
      <Img src={logoSrc} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
