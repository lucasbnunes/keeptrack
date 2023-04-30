import { api } from '@/utils/client';
import { Application } from '@prisma/client';
import { useQuery } from 'react-query';

export function useApplications(search?: string) {
  console.log(search);
  const getApplications = useQuery(['applications', search], async (search) => {
    const { data } = await api.get<Application[]>('/applications', {
      params: search.queryKey[1] ? { search: search.queryKey[1] } : undefined,
    });
    return data;
  });

  return getApplications;
}
