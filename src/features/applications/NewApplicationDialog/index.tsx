'use client';

import { Datepicker } from '@/components/datepicker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useActionState, useState } from 'react';
import { createApplication } from '../actions';

const tzOffsetInMilliseconds = new Date().getTimezoneOffset() * 60000;
const defaultApplicationDate = new Date(Date.now() - tzOffsetInMilliseconds);

const initalActionState = {
  status: 200,
};

export function NewApplicationModal() {
  const [open, setOpen] = useState(false);
  const [_state, submitAction, isPending] = useActionState(
    async (_prevState: typeof initalActionState, formData: FormData) => {
      const result = await createApplication(formData);

      if (result.status === 200) {
        setOpen(false);
      }

      return result;
    },
    initalActionState,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="ml-auto">
            <Plus /> New application
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Application</DialogTitle>
        </DialogHeader>
        <form action={submitAction} className="flex flex-col gap-4" id="form">
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
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              name="notes"
              id="notes"
              disabled={isPending}
              className="min-h-[200px]"
            />
          </Field>
        </form>

        <DialogFooter>
          <Button type="submit" loading={isPending} variant="ghost" form="form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
