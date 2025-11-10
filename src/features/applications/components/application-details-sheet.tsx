import {
  DescriptionDetails,
  DescriptionGroup,
  DescriptionList,
  DescriptionTerm,
} from '@/components/description';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Application } from '@prisma/client';
import { format } from 'date-fns';
import { useState } from 'react';

interface CreateApplicationSheetProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ApplicationDetailsSheet({
  application,
  open,
  onOpenChange,
}: CreateApplicationSheetProps) {
  const [editing, setEditing] = useState(false);

  if (!application) return;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:w-lg sm:max-w-full">
        <SheetHeader>
          <SheetTitle>{application.title}</SheetTitle>
          <SheetDescription>Application details</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="flex flex-col">
            {!editing && (
              <DescriptionList>
                <DescriptionGroup>
                  <DescriptionTerm>Company</DescriptionTerm>
                  <DescriptionDetails>{application.company}</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Applied</DescriptionTerm>
                  <DescriptionDetails>
                    {format(application.applicationDate, 'PPP')}
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Last update</DescriptionTerm>
                  <DescriptionDetails>
                    {format(application.updatedAt, 'PPP')}
                  </DescriptionDetails>
                </DescriptionGroup>
                {application.notes && (
                  <DescriptionGroup>
                    <DescriptionTerm>Notes</DescriptionTerm>
                    <DescriptionDetails>{application.notes}</DescriptionDetails>
                  </DescriptionGroup>
                )}
              </DescriptionList>
            )}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
