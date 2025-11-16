import { Datepicker } from '@/components/datepicker';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Application } from '@prisma/client';
import { useActionState, useEffect } from 'react';
import { updateApplicationAction } from '../actions';
import { UpdateApplicationFields } from '../schemas';

interface CreateApplicationFormProps {
  formId: string;
  applicationId: UpdateApplicationFields['id'];
  defaultValues?: UpdateApplicationFields;
  onSuccess?: (application: Application) => void;
  onPendingChange?: (pending: boolean) => void;
}

const initialActionState = {
  status: 200,
};

export function UpdateApplicationForm({
  applicationId,
  defaultValues,
  formId,
  onSuccess,
  onPendingChange,
}: CreateApplicationFormProps) {
  const [_state, submitAction, isPending] = useActionState(
    async (_prevState: typeof initialActionState, formData: FormData) => {
      const result = await updateApplicationAction(formData);

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
    <form action={submitAction} id={formId} className="flex flex-col gap-4">
      <input name="id" value={applicationId} hidden readOnly />

      <Field>
        <FieldLabel htmlFor="title">Job title</FieldLabel>
        <Input
          id="title"
          name="title"
          disabled={isPending}
          defaultValue={defaultValues?.title}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="company">Company</FieldLabel>
        <Input
          id="company"
          name="company"
          disabled={isPending}
          defaultValue={defaultValues?.company}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="applicationDate">Application date</FieldLabel>
        <Datepicker
          name="applicationDate"
          id="applicationDate"
          disabled={isPending}
          defaultValue={defaultValues?.applicationDate}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="jobUrl">Job URL</FieldLabel>
        <Input
          name="jobUrl"
          id="jobUrl"
          disabled={isPending}
          defaultValue={defaultValues?.jobUrl || undefined}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="notes">Notes</FieldLabel>
        <Textarea
          id="notes"
          name="notes"
          disabled={isPending}
          className="min-h-[200px]"
          defaultValue={defaultValues?.notes || undefined}
        />
      </Field>
    </form>
  );
}
