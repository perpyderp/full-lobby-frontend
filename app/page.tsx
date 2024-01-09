
import { PostForm } from "@/components/PostForm"
import { RecentPosts } from "@/components/RecentPosts"
import { UserDailies } from "@/components/UserDailies"
import React from "react"

export default function Home() {

  return (
    <>
      <div className="grid md:grid-cols-8 sm:grid-cols-2 grid-cols-1 justify-center">
          <UserDailies />
          <div className="md:col-span-3">
            <PostForm />
            <RecentPosts />
          </div>
      </div>
    </>
  )
}