"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"
import { VscHeart, VscHeartFilled } from "react-icons/vsc"
import { revalidateTag } from "next/cache"

type HeartButtonProps = {
    id: string
    likedByMe: boolean
    likesCount: number
}

export const HeartButton:React.FC<HeartButtonProps> = ({ id, likedByMe, likesCount }) => {

    const session = useSession()
    const HeartIcon = VscHeartFilled

    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    if(session.status !== "authenticated") {
        console.log("Loading unauthenticated button")
        return (
            <div className="my-1 flex items-center gap-3 self-start">
                <HeartIcon />
                <span>{likesCount}</span>
            </div>
        )
    }

    async function toggleLike() {
        const like = {
            postId: id,
            userId: session.data?.user.id
        }
        setIsFetching(true)
        const response = await fetch("/api/posts/like", {
            method: "POST",
            body: JSON.stringify(like),
        })
        setIsFetching(false)
    }

    console.log("Loading authenticated button")
    console.log(likedByMe)

    return (
        <button 
            onClick={toggleLike}
            disabled={isPending}
            className={`group items-center gap-1 self-start flex transition-colors duration-200 ${
            likedByMe 
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}
        >
            <HeartIcon className={`transition-colors duration-200 ${
                    likedByMe 
                    ? "fill-red-500"
                    : "fill-gray-500 group-hover:fill-gray-500 group-focus-visible:fill-red-500"}`
                }
            />
            <span>{likesCount}</span>
        </button>
    )
}