import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
