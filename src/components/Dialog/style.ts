import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeInAndScaleUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const StyledDialogOverlay = styled(Dialog.Overlay)`
  background-color: ${({ theme }) => theme.colors.gray[950]}a2;
  position: fixed;
  inset: 0;
  animation: ${fadeIn} 0.1s ease-in;
`;

export const StyledDialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow:
    0.3px 0.5px 0.7px ${(props) => props.theme.colors.gray[950]}0f,
    0.8px 1.6px 2px -0.8px ${(props) => props.theme.colors.gray[950]}0f,
    2.1px 4.1px 5.2px -1.7px ${(props) => props.theme.colors.gray[950]}0f,
    5px 10px 12.6px -2.5px ${(props) => props.theme.colors.gray[950]}0f;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 24px;

  animation: ${fadeInAndScaleUp} 0.1s ease-in;
`;

export const ModalBody = styled.div`
  margin-top: 24px;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  right: 12px;
  top: 12px;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 100%;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blue[50]};
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 24px;
`;
