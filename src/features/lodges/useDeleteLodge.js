import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteLodge as deleteLodgeApi } from '../../services/apiLodges';

export const useDeleteLodge = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteLodge } = useMutation({
    mutationFn: deleteLodgeApi,
    onSuccess: () => {
      toast.success('Lodge entry successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['lodges'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteLodge };
};
