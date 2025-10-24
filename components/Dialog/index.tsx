import * as PrimitiveDialog from "@radix-ui/react-dialog";
import {
  ModalCloseButton,
  StyledDialogContent,
  StyledDialogOverlay,
  DialogFooter,
} from "./style";
import { Cross2Icon } from "@radix-ui/react-icons";

function Dialog({ children, ...props }: PrimitiveDialog.DialogProps) {
  return <PrimitiveDialog.Root {...props}>{children}</PrimitiveDialog.Root>;
}

function DialogClose({
  onClick,
}: {
  onClick?: PrimitiveDialog.DialogCloseProps["onClick"];
}) {
  return (
    <PrimitiveDialog.Close asChild onClick={onClick}>
      <ModalCloseButton>
        <Cross2Icon />
      </ModalCloseButton>
    </PrimitiveDialog.Close>
  );
}
const DialogTrigger = PrimitiveDialog.Trigger;
const DialogTitle = PrimitiveDialog.Title;
const DialogPortal = PrimitiveDialog.Title;

export {
  Dialog,
  DialogClose,
  StyledDialogContent as DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogPortal,
  StyledDialogOverlay as DialogOverlay,
};
