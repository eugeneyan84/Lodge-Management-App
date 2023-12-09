import styled from 'styled-components';

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
  return <LoginLayout>Login</LoginLayout>;
};

export default Login;
