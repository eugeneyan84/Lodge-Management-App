import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => {
      console.log(`[useCheckin.mutationFn] bookingId: ${bookingId}`);
      return updateBooking(bookingId, { status: 'checked-in', is_paid: true });
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },
    onError: (err) => {
      console.error(err);
      toast.error(`Error ecountered while checking in`);
    },
  });
  return { checkin, isCheckingIn };
};
