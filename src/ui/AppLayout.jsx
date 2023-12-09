import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <p>App Layout!</p>
      <Outlet />
    </div>
  );
};

export default AppLayout;
