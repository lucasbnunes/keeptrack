"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Application, Status } from "@prisma/client";
import { useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateApplication } from "../actions";
import {
  UpdateApplication,
  useUpdateApplicationMutation,
} from "../useUpdateApplicationMutation";

interface UpdateApplicationModalProps {
  application: Application;
}

type StatusItem = {
  label: string;
  value: Status;
};

const STATUS_ITEMS: StatusItem[] = [
  {
    label: "Applied",
    value: "applied",
  },
  {
    label: "Offer received",
    value: "offer_received",
  },
  {
    label: "Offer refused",
    value: "offer_refused",
  },
  {
    label: "Not selected",
    value: "not_selected",
  },
  {
    label: "Hired",
    value: "hired",
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
      <form action={submitAction}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit application</DialogTitle>
          </DialogHeader>

          <input name="id" value={application.id} hidden readOnly />
          <Input
            label="Job title"
            fullWidth
            inputProps={{
              ...register("title", { required: true }),
              disabled: isPending,
            }}
          />
          <Input
            label="Company"
            fullWidth
            inputProps={{
              ...register("company", { required: true }),
              disabled: isPending,
            }}
          />
          <Select
            label="Status"
            items={STATUS_ITEMS}
            control={control}
            name="status"
            fullWidth
            rules={{ required: true }}
            disabled={isPending}
          />
          <Input
            label="Notes"
            multiline
            fullWidth
            inputProps={{
              ...register("notes"),
              disabled: isPending,
            }}
          />

          <DialogFooter>
            <Button type="submit" loading={isPending} variant="ghost">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
