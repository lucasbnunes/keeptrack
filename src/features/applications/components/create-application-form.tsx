import { Datepicker } from '@/components/datepicker';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Application, Status } from '@prisma/client';
import { useActionState, useEffect } from 'react';
import { createApplicationAction } from '../actions';
import StatusSelect from './status-select';

interface CreateApplicationFormProps {
  defaultStatus?: Status;
  id: string;
  onSuccess?: (application: Application) => void;
  onPendingChange?: (pending: boolean) => void;
}

const initialActionState = {
  status: 200,
};

const defaultApplicationDate = new Date();

export function CreateApplicationForm({
  defaultStatus,
  id,
  onSuccess,
  onPendingChange,
}: CreateApplicationFormProps) {
  const [_state, submitAction, isPending] = useActionState(
    async (_prevState: typeof initialActionState, formData: FormData) => {
      const result = await createApplicationAction(formData);

      if (result.status === 200 && result.data) {
        onSuccess?.(result.data);
      }

      return result;
    },
    initialActionState,
  );

  useEffect(() => {
    onPendingChange?.(isPending);
  }, [isPending, onPendingChange]);

  return (
    <form action={submitAction} className="flex flex-col gap-4" id={id}>
      <Field>
        <FieldLabel htmlFor="title">Job title</FieldLabel>
        <Input name="title" id="title" disabled={isPending} />
      </Field>

      <Field>
        <FieldLabel htmlFor="company">Company</FieldLabel>
        <Input name="company" id="company" disabled={isPending} />
      </Field>

      <Field>
        <FieldLabel htmlFor="applicationDate">Application date</FieldLabel>
        <Datepicker
          name="applicationDate"
          id="applicationDate"
          disabled={isPending}
          defaultValue={defaultApplicationDate}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="status">Status</FieldLabel>
        <StatusSelect name={'status'} defaultValue={defaultStatus} />
      </Field>

      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          name="notes"
          id="notes"
          disabled={isPending}
          className="min-h-[200px]"
        />
      </Field>
    </form>
  );
}
