import { api } from '@/api/client';
import { Application } from '@prisma/client';
import { useMutation } from 'react-query';

export function useApplicationMutation() {
  const createApplication = useMutation(async (application: Application) => {
    const { data } = await api.post<Application[]>(
      '/applications',
      application
    );
    return data;
  });

  return createApplication;
}
