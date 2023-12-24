import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export const useLogin = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (userData) => {
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('ERROR', error);
      toast.error(`Login Error: ${error.message}`);
    },
  });

  return { login, isLoading };
};
