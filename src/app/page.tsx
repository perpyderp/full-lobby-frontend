
import { PostForm } from "@/components/PostForm"
import { RecentPosts } from "@/components/RecentPosts"
import { UserDailies } from "@/components/UserDailies"
import React from "react"

export default function Home() {

    return (
        <div className="mx-auto my-0 max-w-screen-xl px-8 py-0">
            <div className="grid sm:grid-cols-2 justify-center py-8">
                <UserDailies />
                <div className="">
                    <PostForm />
                    <RecentPosts />
                </div>
            </div>
        </div>
    )
}