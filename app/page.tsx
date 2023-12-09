"use client"

import Posts from "@/components/Posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import UserDailies from "@/components/UserDailies"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function Home() {

  return (
    <>
      <div className="grid grid-cols-4 justify-center">
          <UserDailies />
          <Posts />
      </div>
    </>
  )
}