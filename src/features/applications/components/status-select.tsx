import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';
import { STATUS_METADATA } from '../status';

interface StatusSelectProps extends SelectProps {}

export default function StatusSelect({ ...props }: StatusSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(STATUS_METADATA).map(([status, metadata]) => (
          <SelectItem value={status} key={status}>
            {metadata.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
