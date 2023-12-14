import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createEditLodge } from '../../services/apiLodges';

export const useEditLodge = () => {
  const queryClient = useQueryClient();

  const { mutate: editLodge, isLoading: isEditing } = useMutation({
    mutationFn: ({ newLodgeData, id }) => createEditLodge(newLodgeData, id),
    onSuccess: () => {
      toast.success('New lodge successfully edited');
      queryClient.invalidateQueries({ queryKey: ['lodges'] });
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { isEditing, editLodge };
};
