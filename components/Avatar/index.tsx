import { useSession } from "next-auth/react";
import { StyledAvatarRoot, StyledAvatarImage, StyledAvatarFallback } from "./styles";

interface AvatarProps {
  className?: string;
}

function getInitials(name: string) {
  let initials = "";
  const nameArr = name.split(" ");

  initials += nameArr[0].charAt(0).toUpperCase();

  if (nameArr.length >= 2) {
    initials += nameArr[1].charAt(0).toUpperCase();
  }

  return initials;
}

export function Avatar({ className }: AvatarProps) {
  const { data } = useSession()

  const initials = getInitials(data?.user?.name || "")

  return (
    <StyledAvatarRoot className={className}>
      <StyledAvatarImage src={data?.user?.image || ""} alt={data?.user?.name || ""} />
      <StyledAvatarFallback>{initials}</StyledAvatarFallback>
    </StyledAvatarRoot>
  )
}