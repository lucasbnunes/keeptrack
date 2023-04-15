import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { NewApplicationForm } from './style';
import { Button } from '@/components/Button';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { NewApplication, useApplicationMutation } from '../useApplicationMutation';

interface ApplicationModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function NewApplicationModal({ open, setOpen }: ApplicationModal) {
  const applicationMutation = useApplicationMutation()
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewApplication>();

  const onSubmit: SubmitHandler<NewApplication> = async (data) => {
    try {
      await applicationMutation.mutateAsync({ ...data, status: 'applied' })
      setOpen(false)
      reset()
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Title>New Application</Modal.Title>
      <Modal.Body>
        <NewApplicationForm id="applicationForm" onSubmit={handleSubmit(onSubmit)} >
          <Input label='Job title' fullWidth inputProps={{ ...register("title", { required: true }), disabled: applicationMutation.isLoading }} />
          <Input label='Company' fullWidth inputProps={{ ...register("company", { required: true }), disabled: applicationMutation.isLoading }} />
          <Input
            label='Application date'
            inputProps={{ ...register("applicationDate", { required: true }), type: 'date', defaultValue: new Date().toISOString().slice(0, 10), disabled: applicationMutation.isLoading }}
            fullWidth
          />
          <Input label='Notes' multiline fullWidth inputProps={{ ...register("notes"), disabled: applicationMutation.isLoading }} />
        </NewApplicationForm>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' form='applicationForm' loading={applicationMutation.isLoading}> Save</Button>
      </Modal.Footer>
    </Modal >
  )

}