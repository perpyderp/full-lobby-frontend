"use client"

import Image from "next/image";
import Link from "next/link";
import { Input } from "./Input";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";

import { Menu } from "lucide-react";
import { UserNav } from "./UserNav";


export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-gray-800 bg-opacity-70 font-semibold text-sm flex flex-row justify-between h-14 items-center border-b border-slate-500">
        <Link href="/" className="flex items-center ml-4">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            height={48}
            width={48}
          />
          <p className="pl-2 text-xl">Full Lobby</p>
        </Link>

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
      
      <div className="hidden md:flex md:items-center mr-4">
            {
              session?.user ?
              <UserNav user={session.user}/> :
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
      <div className="md:hidden mr-4 flex flex-row items-center gap-4">
        <Menu />
        {session?.user ?
        <UserNav user={session.user} /> :
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
    </nav>
  )
}
