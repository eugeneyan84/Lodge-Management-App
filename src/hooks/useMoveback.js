import { useNavigate } from 'react-router-dom';

/* hook for going back to previous page */
export const useMoveback = () => {
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
};
