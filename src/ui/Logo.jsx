import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Logo = () => {
  return (
    <StyledLogo>
      <Img src="/lodge-logo.png" alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
