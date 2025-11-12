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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Application } from '@prisma/client';
import { format } from 'date-fns';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { UpdateApplicationForm } from './update-application-form';

interface ApplicationDetailsSheetProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const formId = 'updateApplicationForm';

export function ApplicationDetailsSheet({
  application,
  open,
  onOpenChange,
}: ApplicationDetailsSheetProps) {
  const [editing, setEditing] = useState(false);

  function handleOpenChange(open: boolean) {
    onOpenChange(open);
    setEditing(false);
  }

  if (!application) return;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:w-lg sm:max-w-full">
        <SheetHeader>
          <SheetTitle>{application.title}</SheetTitle>
          <SheetDescription>Application details</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="flex flex-col">
            {!editing && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="self-end"
                      onClick={() => setEditing(true)}
                    >
                      <SquarePen />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Edit</span>
                  </TooltipContent>
                </Tooltip>

                <DescriptionList>
                  <DescriptionGroup>
                    <DescriptionTerm>Company</DescriptionTerm>
                    <DescriptionDetails>
                      {application.company}
                    </DescriptionDetails>
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
                      <DescriptionDetails>
                        {application.notes}
                      </DescriptionDetails>
                    </DescriptionGroup>
                  )}
                </DescriptionList>
              </>
            )}
          </div>

          {editing && (
            <UpdateApplicationForm
              applicationId={application.id}
              formId={formId}
              defaultValues={application}
              onSuccess={() => {
                setEditing(false);
              }}
            />
          )}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Close</Button>
          </SheetClose>

          {editing && (
            <Button type="submit" form={formId}>
              Save
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
