"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useActionState, useEffect, useState } from "react";
import { createApplication } from "../actions";

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
      <form action={submitAction}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>
            <PlusIcon /> New application
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Application</DialogTitle>
          </DialogHeader>
          <Input
            label="Job title"
            fullWidth
            inputProps={{ disabled: isPending, name: "title" }}
          />
          <Input
            label="Company"
            fullWidth
            inputProps={{ disabled: isPending, name: "company" }}
          />
          <Input
            label="Application date"
            inputProps={{
              type: "date",
              defaultValue: DEFAULT_APPLICATION_DATE,
              disabled: isPending,
              name: "applicationDate",
            }}
            fullWidth
          />
          <Input
            label="Notes"
            multiline
            fullWidth
            inputProps={{ disabled: isPending, name: "notes" }}
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
