
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuGroup, 
  DropdownMenuItem } 
from "@/components/ui/DropdownMenu";
import { User } from "next-auth";
import { UserAvatar } from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserNavProps {
    user: Pick<User, "username" | "avatar" | "email">
}

export const UserNav: React.FC<UserNavProps> = ({ user }) => {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar 
                user={user}
            />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link
                href={"/profile/" + user.username}
              >
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={"/settings"}
              >
                Settings
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: "/"
              })
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    )
}