import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  //const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      console.log(`[useCheckin.mutationFn] bookingId: ${bookingId}`);
      return updateBooking(bookingId, {
        status: 'checked-out',
      });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      //navigate('/');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Error ecountered while checking out`);
    },
  });
  return { checkout, isCheckingOut };
};
