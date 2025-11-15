import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { deleteApplicationAction } from '../actions';

export function DeleteConfirmationDialog({
  children,
  applicationId,
  onDelete,
}: {
  children: React.ReactNode;
  applicationId: string;
  onDelete: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const deleteApplication = async () =>
    startTransition(async () => {
      const result = await deleteApplicationAction(applicationId);

      if (result?.status === 200) {
        setOpen(false);
        onDelete();
      }
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete application?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this application?{' '}
            {`This action can't be undone`}.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={deleteApplication}
            loading={isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
