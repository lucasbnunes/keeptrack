"use client";

import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Application, Status } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  UpdateApplication,
  useUpdateApplicationMutation,
} from "../useUpdateApplicationMutation";
import { UpdateApplicationForm } from "./style";
import { useState } from "react";

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
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateApplication>({ defaultValues });
  const applicationMutation = useUpdateApplicationMutation();

  const onSubmit: SubmitHandler<UpdateApplication> = async (data) => {
    try {
      await applicationMutation.mutateAsync({ ...data, id: application.id });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  function handleClose() {
    setOpen(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Edit</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <UpdateApplicationForm onSubmit={handleSubmit(onSubmit)}>
            <DialogClose onClick={() => setOpen(false)} />
            <DialogTitle>Edit application</DialogTitle>

            <Input
              label="Job title"
              fullWidth
              inputProps={{
                ...register("title", { required: true }),
                disabled: applicationMutation.isLoading,
              }}
            />
            <Input
              label="Company"
              fullWidth
              inputProps={{
                ...register("company", { required: true }),
                disabled: applicationMutation.isLoading,
              }}
            />
            <Select
              label="Status"
              items={STATUS_ITEMS}
              control={control}
              name="status"
              fullWidth
              rules={{ required: true }}
              disabled={applicationMutation.isLoading}
            />
            <Input
              label="Notes"
              multiline
              fullWidth
              inputProps={{
                ...register("notes"),
                disabled: applicationMutation.isLoading,
              }}
            />

            <DialogFooter>
              <Button type="submit" loading={applicationMutation.isLoading}>
                Save
              </Button>
            </DialogFooter>
          </UpdateApplicationForm>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
