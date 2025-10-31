'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Application, Status } from '@prisma/client';
import { useActionState, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updateApplication } from '../actions';
import { UpdateApplication } from '../useUpdateApplicationMutation';
import { Textarea } from '@/components/ui/textarea';

interface UpdateApplicationModalProps {
  application: Application;
}

type StatusItem = {
  label: string;
  value: Status;
};

const STATUS_ITEMS: StatusItem[] = [
  {
    label: 'Applied',
    value: 'applied',
  },
  {
    label: 'Offer received',
    value: 'offer_received',
  },
  {
    label: 'Offer refused',
    value: 'offer_refused',
  },
  {
    label: 'Not selected',
    value: 'not_selected',
  },
  {
    label: 'Hired',
    value: 'hired',
  },
];

export function UpdateApplicationDialog({
  application,
}: UpdateApplicationModalProps) {
  const [open, setOpen] = useState(false);

  const defaultValues: UpdateApplication = {
    id: application.id,
    title: application.title,
    company: application.company,
    notes: application.notes,
    status: application.status,
  };

  const {
    register,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<UpdateApplication>({ defaultValues });
  const [actionState, submitAction, isPending] = useActionState(
    updateApplication,
    {
      status: 200,
    },
  );

  useEffect(() => {
    console.log(actionState);
    if (actionState.status === 200) {
      setOpen(false);
    }
  }, [actionState]);

  function handleClose() {
    setOpen(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit application</DialogTitle>
        </DialogHeader>
        <form action={submitAction} id="form" className="flex flex-col gap-4">
          <input name="id" value={application.id} hidden readOnly />

          <Field>
            <FieldLabel htmlFor="title">Job title</FieldLabel>
            <Input
              id="title"
              {...register('title', { required: true })}
              disabled={isPending}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input
              id="company"
              {...register('company', { required: true })}
              disabled={isPending}
            />
          </Field>

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_ITEMS.map((status) => (
                      <SelectItem value={status.value} key={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              id="notes"
              {...register('notes')}
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
