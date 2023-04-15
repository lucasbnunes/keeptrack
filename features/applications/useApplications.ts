import { api } from '@/api/client';
import { Application } from '@prisma/client';
import { useQuery } from 'react-query';

export function useApplications() {
  const getApplications = useQuery('applications', async () => {
    const { data } = await api.get<Application[]>('/applications');
    return data;
  });

  return getApplications;
}
