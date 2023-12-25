import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCurrentUser, isPending } = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUserApi({ fullName, password, avatar }),
    onSuccess: () => {
      toast.success('New user successfully created');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCurrentUser, isPending };
};
