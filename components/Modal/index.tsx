import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';
import { ModalFooter, StyledDialogContent, StyledDialogOverlay } from './style';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { ModalBody, ModalCloseButton } from './style';

interface Modal {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Modal({ children, open, setOpen }: Modal) {

  function handleClose() {
    setOpen(false)
  }
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent aria-describedby={undefined} onInteractOutside={handleClose} onEscapeKeyDown={handleClose}>
          <Dialog.Close asChild>
            <ModalCloseButton aria-label="Close" onClick={handleClose}>
              <Cross2Icon />
            </ModalCloseButton>
          </Dialog.Close>
          {children}
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )

}

Modal.Title = Dialog.Title;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

