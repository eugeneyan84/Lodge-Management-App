import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.main`
  background-color: lightcoral;
  padding: 4rem 4.8rem 6.4rem;
`;

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default AppLayout;
