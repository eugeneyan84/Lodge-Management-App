import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../../services/apiAuth';

const useSignup = () => {
  const { mutation: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created. Please verify new account from user's email address."
      );
    },
  });
  return { signup, isLoading };
};

export default useSignup;
