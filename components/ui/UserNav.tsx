"use client"

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
import { signOut, useSession } from "next-auth/react";

interface UserNavProps {}

export const UserNav: React.FC<UserNavProps> = () => {

    const session = useSession()
    if(session.status !== "authenticated") return (
        <ul className="flex flex-row space-x-2">
            <li>
            <Link href="/sign-in" className="text-slate-200 hover:text-lime-200">
                Sign In
            </Link>
            </li>
            <li>
            <Link href="/register" className="text-slate-200 hover:text-lime-200">
                Register
            </Link>
            </li>
        </ul>
    )

  const user = session.data.user

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