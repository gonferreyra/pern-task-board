import { useQuery } from '@tanstack/react-query';
import { getUser } from './api';

export const useAuth = (options = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: ['auth'],
    queryFn: getUser,
    staleTime: Infinity,
    ...options,
  });
  return { user, ...rest };
};
