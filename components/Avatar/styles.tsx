import styled from "styled-components";
import * as Avatar from '@radix-ui/react-avatar';

export const StyledAvatarRoot = styled(Avatar.Root)`
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
`

export const StyledAvatarImage = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

export const StyledAvatarFallback = styled(Avatar.Fallback)`
   width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${(props) => props.theme.colors.blue[900]};
  font-size: 1.25rem;
  line-height: 1;
  font-weight: 700;
  border-radius: inherit;
`