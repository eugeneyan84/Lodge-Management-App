import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import Heading from './Heading';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderContentsDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContentsDiv>
        <Heading as="h1"></Heading>
        <Logout />
      </HeaderContentsDiv>
    </StyledHeader>
  );
};

export default Header;
