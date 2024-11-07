import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteSession, getSessions, getUser } from './api';
import { Session } from './types';
import toast from 'react-hot-toast';

export const useAuth = (options = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: ['auth'],
    queryFn: getUser,
    staleTime: Infinity,
    ...options,
  });
  return { user, ...rest };
};

export const useSessions = (options = {}) => {
  const { data: sessions, ...rest } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
    ...options,
  });
  return { sessions, ...rest };
};

export const useDeleteSessions = (sessionId: number) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      // update cache without refetching - optimistic update
      queryClient.setQueryData(['sessions'], (cache: Session[]) =>
        cache.filter((session) => session.id !== sessionId),
      );
      // refetch and update cache
      // queryClient.invalidateQueries(['sessions'])
      toast.success('Session deleted successfully');
    },
  });
  return {
    deleteSession: mutate,
    ...rest,
  };
};
