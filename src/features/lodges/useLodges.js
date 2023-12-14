import { useQuery } from '@tanstack/react-query';

import { getLodges } from '../../services/apiLodges';

export const useLodges = () => {
  const {
    isLoading,
    data: lodges,
    error,
  } = useQuery({
    queryKey: ['lodges'],
    queryFn: getLodges,
  });

  return { isLoading, lodges, error };
};
