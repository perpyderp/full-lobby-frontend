"use client"

import Image from "next/image";
import Link from "next/link";
import { Input } from "./Input";
import { Search } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem
} from "@/components/ui/DropdownMenu";


export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 bg-opacity-70 font-semibold text-sm flex flex-row justify-evenly h-12 border-b border-slate-500">
      <div id="logo" className="flex">
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            height={48}
            width={48}
          />
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-5">
        <Search />
        <Input 
          className="h-8"
        />
        <div className="text-slate-200 hover:text-lime-200">
          <Link href="/reviews">
            Reviews
          </Link>
        </div>
        <div className="text-slate-200 hover:text-lime-200">
          <Link href="/posts">
            Posts
          </Link>
        </div>
      </div>

      <div className="hidden md:flex md:items-center">
            {
              session ? 
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="https://avatars.akamai.steamstatic.com/15a13489bf6f375f0c5505dd4d43a7e2ce1ac015_full.jpg" alt="@username" />
                        <AvatarFallback>NL</AvatarFallback>
                      </Avatar>
                    </Button> 
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">shadcn</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        m@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              :
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
            }
      </div>

      { /* Mobile Navigation */}
      <div className="md:hidden">
        

      </div>
    </nav>
  )
}