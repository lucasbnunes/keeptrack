import { Application, Status } from "@prisma/client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { Select } from "@/components/Select";
import { useUpdateApplicationMutation, UpdateApplication } from "../useUpdateApplicationMutation";
import { UpdateApplicationForm } from "./style";

interface UpdateApplicationModalProps {
  application: Application;
  open: boolean;
  setOpen: (open: boolean) => void;
}

type StatusItem = {
  label: string;
  value: Status
}

const STATUS_ITEMS: StatusItem[] = [
  {
    label: 'Applied',
    value: 'applied'
  },
  {
    label: 'Offer received',
    value: 'offer_received'
  },
  {
    label: 'Offer refused',
    value: 'offer_refused'
  },
  {
    label: 'Not selected',
    value: 'not_selected'
  },
  {
    label: 'Hired',
    value: 'hired'
  },
]



export function UpdateApplicationModal({ application, open, setOpen }: UpdateApplicationModalProps) {
  const defaultValues: UpdateApplication = {
    id: application.id,
    title: application.title,
    company: application.company,
    notes: application.notes,
    status: application.status,
  }

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<UpdateApplication>({ defaultValues });
  const applicationMutation = useUpdateApplicationMutation()

  const onSubmit: SubmitHandler<UpdateApplication> = async (data) => {
    try {
      await applicationMutation.mutateAsync({ ...data, id: application.id })
      handleClose()
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    setOpen(false)
    reset()
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Title>
        Edit application
      </Modal.Title>
      <Modal.Body>
        <UpdateApplicationForm id="editApplicationForm" onSubmit={handleSubmit(onSubmit)} >
          <Input label='Job title' fullWidth inputProps={{ ...register("title", { required: true }), disabled: applicationMutation.isLoading }} />
          <Input label='Company' fullWidth inputProps={{ ...register("company", { required: true }), disabled: applicationMutation.isLoading }} />
          <Select label='Status' items={STATUS_ITEMS} control={control} name="status" fullWidth rules={{ required: true }} disabled={applicationMutation.isLoading} />
          <Input label='Notes' multiline fullWidth inputProps={{ ...register("notes"), disabled: applicationMutation.isLoading }} />
        </UpdateApplicationForm>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="editApplicationForm" loading={applicationMutation.isLoading}>Save</Button>
      </Modal.Footer>
    </Modal >
  )
}