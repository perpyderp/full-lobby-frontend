
import Image from "next/image";
import Link from "next/link";

import { UserNav } from "./UserNav";

export default function Navbar() {

  return (
    <nav className="bg-gray-800 bg-opacity-70 font-semibold text-sm flex flex-row justify-between pl-7 h-14 items-center border-b border-slate-500">
        <Link href="/" className="flex items-center ml-4">
          <Image 
            src="/assets/logo.png"
            alt="logo"
            height={48}
            width={48}
          />
          <p className="pl-2 text-xl">Full Lobby</p>
        </Link>
      
        <div className="flex md:items-center mr-4">
            <UserNav />
        </div>

      { /* Mobile Navigation */}
      {/* <div className="md:hidden mr-4 flex flex-row items-center gap-4">
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

      </div> */}
    </nav>
  )
}
