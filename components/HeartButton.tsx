"use client"

import { useSession } from "next-auth/react"
import { useContext, useState, useTransition } from "react"
import { VscHeartFilled } from "react-icons/vsc"
import { useMutatePostsContext } from "./RecentPosts"

type HeartButtonProps = {
    id: string
    likedByMe: boolean
    likesCount: number
}

export const HeartButton:React.FC<HeartButtonProps> = ({ id, likedByMe, likesCount }) => {

    const session = useSession()

    const { mutatePosts } = useMutatePostsContext()

    const HeartIcon = VscHeartFilled

    const [isFetching, setIsFetching] = useState<boolean>(false)

    if(session.status !== "authenticated") {
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
        mutatePosts()
        setIsFetching(false)
    }

    return (
        <button 
            onClick={toggleLike}
            disabled={isFetching}
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