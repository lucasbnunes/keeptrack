"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { createApplication } from "../actions";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const tzOffsetInMilliseconds = new Date().getTimezoneOffset() * 60000;
const DEFAULT_APPLICATION_DATE = new Date(Date.now() - tzOffsetInMilliseconds)
  .toISOString()
  .slice(0, 10);

export function NewApplicationModal() {
  const [open, setOpen] = useState(false);
  const [state, submitAction, isPending] = useActionState(createApplication, {
    status: 200,
  });

  useEffect(() => {
    if (state.status === 200) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus /> New application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Application</DialogTitle>
        </DialogHeader>
        <form action={submitAction} className="flex flex-col gap-4">
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
            <Input
              name="applicationDate"
              id="applicationDate"
              disabled={isPending}
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
          <Button type="submit" loading={isPending} variant="ghost">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
