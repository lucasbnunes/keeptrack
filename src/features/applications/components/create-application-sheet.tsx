import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Status } from '@prisma/client';
import { CreateApplicationForm } from './create-application-form';
import { useState } from 'react';

interface CreateApplicationSheetProps {
  defaultStatus: Status;
  children: React.ReactNode;
}

const formId = 'createApplicationForm';

export default function CreateApplicationSheet({
  defaultStatus,
  children,
}: CreateApplicationSheetProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New application</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <CreateApplicationForm
            id={formId}
            defaultStatus={defaultStatus}
            onSuccess={() => setOpen(false)}
            onPendingChange={setPending}
          />
        </div>

        <SheetFooter>
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button type="submit" form={formId} loading={pending}>
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
