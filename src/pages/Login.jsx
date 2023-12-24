import styled from 'styled-components';

import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import LoginForm from '../features/authentication/LoginForm';

// co-located style
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45rem;
  align-content: center;
  justify-content: center;
  gap: 3rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
