import Link from "next/link"
import { UserAvatar } from "./ui/UserAvatar"

import { Post } from "@/types"
import { HeartButton } from "./HeartButton"
import React from "react"
import { dateFormat } from "@/lib/dateFormat"

interface PostCardProps extends React.HTMLAttributes<HTMLLIElement> {
    post: Post
}

export const PostCard:React.FC<PostCardProps> = ({ post }) => {

    return (
        <li className="flex gap-4 border-b px-4 py-4">
            <Link
                href={`/profile/${post.user.username}`}
            >
                <UserAvatar user={post.user}/>
            </Link>
            <div className="flex flex-grow flex-col">
                <div className="flex gap-1">
                    <Link
                        href={`/profile/${post.user.username}`}
                        className="font-bold outline-none hover:underline focus-visible:underline"
                    >
                        {post.user.username}
                    </Link>
                    <span className="">-</span>
                    <span>{dateFormat(post.createdAt.toString())}</span>
                </div>
                <p className="whitespace-pre-wrap">{post.description}</p>
                <HeartButton id={post.id} likedByMe={post.likedByMe} likesCount={post.likes.length} />
            </div>
        </li>
    )
}
