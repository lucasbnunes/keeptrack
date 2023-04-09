import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { NewApplicationForm } from './style';
import { Button } from '@/components/Button';

interface ApplicationModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function NewApplicationModal({ open, setOpen }: ApplicationModal) {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Title>New Application</Modal.Title>
      <Modal.Body>
        <NewApplicationForm>
          <Input label='Job title' fullWidth />
          <Input label='Company' fullWidth />
          <Input label='Application date' inputProps={{ type: 'date', defaultValue: new Date().toISOString().slice(0, 10) }} fullWidth />
          <Input label='Notes' multiline fullWidth />
        </NewApplicationForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpen(false)}>Save</Button>
      </Modal.Footer>
    </Modal>
  )

}