import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditLodge } from '../../services/apiLodges';

export const useCreateLodge = () => {
  const queryClient = useQueryClient();

  const { mutate: createLodge, isLoading: isCreating } = useMutation({
    mutationFn: createEditLodge,
    onSuccess: () => {
      toast.success('New lodge successfully created');
      queryClient.invalidateQueries({ queryKey: ['lodges'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createLodge };
};
