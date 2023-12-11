"use client"

import Image from "next/image";
import Link from "next/link";
import { Input } from "./Input";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";

import { UserNav } from "./UserNav";


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
      <div className="md:hidden">
        

      </div>
    </nav>
  )
}