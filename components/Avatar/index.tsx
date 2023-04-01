import { StyledAvatarRoot, StyledAvatarImage, StyledAvatarFallback } from "./styles";

interface AvatarProps {
  image?: string;
  name: string;
}

export function Avatar({ image = '', name }: AvatarProps) {
  return (
    <StyledAvatarRoot>
      <StyledAvatarImage src={image} alt={name} />
      <StyledAvatarFallback>{name[0]}</StyledAvatarFallback>
    </StyledAvatarRoot>
  )
}