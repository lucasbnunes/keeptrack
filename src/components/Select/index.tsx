import * as RadixSelect from '@radix-ui/react-select';
import { Control, Controller, FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface SelectProps {
  items: SelectItem[]
  label: string;
  fullWidth?: boolean;
  control: Control<any, any>;
  name: string;
  rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate">;
  disabled?: boolean;
}

type SelectItem = {
  value: string,
  label: string,
}

export function Select({ items, control, label, name, rules, fullWidth, disabled }: SelectProps) {

  return (
    <label>
      <SelectLabel>{label}</SelectLabel>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) =>
          <RadixSelect.Root {...field} onValueChange={field.onChange} >
            <StyledSelectTrigger fullWidth={fullWidth} disabled={disabled}>

              <RadixSelect.Value />
              <RadixSelect.Icon />
            </StyledSelectTrigger>

            <RadixSelect.Portal>
              <StyledSelectContent position="popper">
                <RadixSelect.Viewport>

                  {items.map((item) => (
                    <StyledSelectItem key={item.value} value={item.value}>
                      <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                    </StyledSelectItem>
                  ))
                  }


                </RadixSelect.Viewport>
              </StyledSelectContent>
            </RadixSelect.Portal>
          </RadixSelect.Root>
        }
      />

    </label>
  );
}

const StyledSelectTrigger = styled(RadixSelect.Trigger) <{ fullWidth?: boolean }>`
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '300px')};
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-between;

  width: 100%;

  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  min-width: 200px;
  color: ${({ theme }) => theme.colors.gray[800]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.blue[200]};
    border-color: transparent;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }
  /*box-shadow: 0 2px 10px var(--blackA7);*/
`

const SelectLabel = styled.span`
  display: inline-block;
  margin: 0px 4px 2px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray[700]};
`

const StyledSelectContent = styled(RadixSelect.Content)`
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
  box-sizing: border-box;
  margin: 0 auto;
  overflow: hidden;
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0.3px 0.5px 0.7px ${(props) => props.theme.colors.gray[950]}0f,
    0.8px 1.6px 2px -0.8px ${(props) => props.theme.colors.gray[950]}0f,
    2.1px 4.1px 5.2px -1.7px ${(props) => props.theme.colors.gray[950]}0f,
    5px 10px 12.6px -2.5px ${(props) => props.theme.colors.gray[950]}0f;
`

export const StyledSelectItem = styled(RadixSelect.Item)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  padding-left: 18px;
  border-radius: 4px;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.colors.blue[100]};
  }
`;