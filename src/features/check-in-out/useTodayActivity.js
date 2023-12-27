import { useQuery } from '@tanstack/react-query';

import { getStaysTodayActivity } from '../../services/apiBookings';

export const useTodayActivity = () => {
  console.log(`useTodayActivity start`);
  const { isLoading, data: activities } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isLoading };
};
