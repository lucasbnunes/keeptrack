import { authClient } from "@/lib/auth-client";
import {
  Avatar as ShadcnAvatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

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
  const { useSession } = authClient;
  const session = useSession();

  if (session.isPending) {
    return <></>;
  }

  const initials = getInitials(session?.data?.user.name || "");

  return (
    <ShadcnAvatar className={className}>
      <AvatarImage
        src={session?.data?.user?.image || ""}
        alt={session?.data?.user.name || ""}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </ShadcnAvatar>
  );
}
