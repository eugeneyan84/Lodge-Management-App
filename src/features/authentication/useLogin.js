import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../../services/apiAuth';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    onSuccess: (userData) => {
      // to assist useQuery in useUser, so react-query
      // can immediately use the data instead of having to
      // trigger th API call
      queryClient.setQueriesData(['user'], userData);

      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('ERROR', error);
      toast.error(`Login Error: ${error.message}`);
    },
  });

  return { login, isLoading };
};
