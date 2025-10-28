"use client";
import styled from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export const AccountButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledDropdownMenuContent = styled(DropdownMenu.Content)`
  background-color: white;
  padding: 8px;
  border-radius: 4px;
  min-width: 180px;
  box-shadow:
    0.3px 0.5px 0.7px ${(props) => props.theme.colors.gray[950]}0f,
    0.8px 1.6px 2px -0.8px ${(props) => props.theme.colors.gray[950]}0f,
    2.1px 4.1px 5.2px -1.7px ${(props) => props.theme.colors.gray[950]}0f,
    5px 10px 12.6px -2.5px ${(props) => props.theme.colors.gray[950]}0f;
`;

export const StyledDropdownMenuItem = styled(DropdownMenu.Item)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  padding-left: 18px;
  border-radius: inherit;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus-visible {
    background-color: ${(props) => props.theme.colors.blue[100]};
  }
`;
