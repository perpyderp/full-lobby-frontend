"use client"

import { Posts } from "@/components/Posts"
import { UserDailies } from "@/components/UserDailies"
import React from "react"

export default function Home() {

  return (
    <>
      <div className="grid md:grid-cols-8 sm:grid-cols-2 grid-cols-1 justify-center">
          <UserDailies />
          <Posts />
      </div>
    </>
  )
}