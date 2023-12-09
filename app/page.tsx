"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

export default function Home() {

  return (
    <>
      <div className="grid grid-cols-4">
        <div>
          <h3>Username</h3>
          <h4>Daily Tasks</h4>
          <ul>
            <li>Create a post</li>
            <li>Like 5 posts</li>
            <li>Comment on a post</li>
          </ul>
          <h4>Weekly Tasks</h4>
          <ul>
            <li>Like 40 posts</li>
            <li></li>
          </ul>
        </div>
      </div>
      <div>
        Posts feed
      </div>
    </>
  )
}