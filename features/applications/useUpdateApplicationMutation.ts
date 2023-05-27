import { api } from '@/utils/client';
import { Application } from '@prisma/client';
import { useQueryClient, useMutation } from 'react-query';

export type UpdateApplication = Pick<
  Application,
  'title' | 'company' | 'notes' | 'status' | 'id'
>;

export function useUpdateApplicationMutation() {
  const queryClient = useQueryClient();
  const applicationMutation = useMutation(
    async (application: UpdateApplication) => {
      const { data } = await api.put<Application>(
        `/applications/${application.id}`,
        application
      );
      return data;
    },
    {
      onMutate: async (updatedApplication) => {
        await queryClient.cancelQueries({
          queryKey: ['applications', ''],
        });

        const previousApplications = queryClient.getQueryData<Application[]>([
          'applications',
          '',
        ]);

        if (previousApplications) {
          const updatedApplicationIndex = previousApplications.findIndex(
            (application) => application.id === updatedApplication.id
          );

          const newApplications = [...previousApplications];

          newApplications[updatedApplicationIndex] = {
            ...newApplications[updatedApplicationIndex],
            ...updatedApplication,
          };

          queryClient.setQueryData(['applications', ''], newApplications);
          return { previousApplications, newApplications };
        }
      },
      onError: (_err, _newApplication, context) => {
        queryClient.setQueryData(
          ['applications', ''],
          context?.previousApplications
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['applications'] });
      },
    }
  );

  return applicationMutation;
}
