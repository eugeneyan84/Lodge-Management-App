import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1) load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2) if no authenticated user, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log(`[Protected Route] redirecting back to login!`);
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3) show spinner while loading #1
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4) if there is authenticated user, render app as usual
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
