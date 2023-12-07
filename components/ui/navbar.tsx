"use client"

import Image from "next/image";
import Link from "next/link";
import { Input } from "./input";
import { Search } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";


export default function Navbar() {
  const { data: session, status } = useSession();

  console.log(session);
  return (
    <nav className="bg-gray-800 bg-opacity-70 font-semibold text-sm flex flex-row justify-evenly h-12 border-b border-slate-500">
      <div id="logo" className="flex justify-start">
        <Link href="/">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            height={48}
            width={48}
          />
        </Link>
      </div>

      <div className="flex items-center space-x-5">
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

      <div className="flex items-center">
            {
              session ? <Avatar className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                <AvatarImage src="https://avatars.akamai.steamstatic.com/15a13489bf6f375f0c5505dd4d43a7e2ce1ac015_full.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> :
              <ul>
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
    </nav>
  )
}