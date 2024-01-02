"use client"

import { HeartIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

type HeartButtonProps = {
    onClick: () => void
    likedByMe: boolean
    likesCount: number
}

export const HeartButton:React.FC<HeartButtonProps> = ({ onClick, likedByMe, likesCount }) => {

    const session = useSession()
    const Heart = likedByMe ? <HeartIcon fill="red"/> : <HeartIcon />

    if(session.status !== "authenticated") {
        return (
            <div className="my-1 flex items-center gap-3 self-start">
                {Heart}
                <span>{likesCount}</span>
            </div>
        )
    }
    return (
        <button 
            onClick={onClick}
            className={`group items-center gap-1 self-start flex transition-colors duration-200 ${
            likedByMe 
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}>
            <HeartIcon className={`transition-colors duration-200 ${likedByMe 
                ? "fill-red-500"
                : "fill-gray-500 group-hover:fill-gray-500 group-focus-visible:fill-red-500"}`}
                fill={"red"}
            />
            <span>{likesCount}</span>
        </button>
    )
}