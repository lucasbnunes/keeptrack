import { api } from '@/utils/client';
import { Application } from '@prisma/client';
import { useMutation, useQueryClient } from 'react-query';

export type NewApplication = Pick<
  Application,
  'title' | 'company' | 'applicationDate' | 'notes' | 'status'
> & { applicationDate: string };

export function useApplicationMutation() {
  const queryClient = useQueryClient();
  const createApplication = useMutation(
    async (application: NewApplication) => {
      const { data } = await api.post<Application[]>(
        '/applications',
        application
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      },
    }
  );

  return createApplication;
}
