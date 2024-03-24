"use client"

import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { Skeleton } from "./ui/Skeleton"

interface UserDailiesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserDailies: React.FC = ({className, ...props}: UserDailiesProps) => {

    const { data:session, status } = useSession()

    const username = session?.user.username

    if(status === "loading") return <Skeleton />

    if(status === "unauthenticated") return <div>
        Login to get dailies and level up!
    </div>

    const percentage = 66;

    return (
        <div className={cn("flex flex-col gap-4", className)} {...props}>
            <h3 className="text-2xl font-extrabold">Welcome back {username}!</h3>
            <h4 className="text-lg font-bold">Daily Tasks</h4>
            <ul className="flex flex-col">
                <li className="ml-4">Create a post</li>
                <li className="ml-4">Like 5 posts</li>
                <li className="ml-4">Comment on a post</li>
            </ul>
            <h4 className="text-lg font-bold">Weekly Tasks</h4>
            <ul className="">
                <li className="ml-4">Like 40 posts</li>
                <li className="ml-4">Make a new friend</li>
            </ul>
            
        </div>
    )
}