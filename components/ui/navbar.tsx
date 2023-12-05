import Image from "next/image";
import Link from "next/link";
import { Input } from "./input";
import { Search } from "lucide-react";

export default function Navbar() {
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
        <Link href="/register" className="text-slate-200 hover:text-lime-200">
          Register
        </Link>
      </div>
    </nav>
  )
}