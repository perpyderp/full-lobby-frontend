import Link from "next/link"
import { UserAvatar } from "./ui/UserAvatar"

import { Post } from "@/types"
import { HeartButton } from "./HeartButton"

function dateFormat(date:string) {

    const newDate = new Date(date)
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${
        newDate.getDate().toString().padStart(2, '0')
        }/${newDate.getFullYear()}`

    return formattedDate

}

interface PostCardProps extends React.HTMLAttributes<HTMLLIElement> {
    post: Post,
}

export const PostCard:React.FC<Post> = ({ id, user, description, createdAt, likes, likedByMe }) => {


    const handleToggleLike = async () => {
        const like = {
            postId: id,
            userId: user.id
        }
        const response = await fetch("/api/posts/like", {
            method: "POST",
            body: JSON.stringify(like)
        })
    }

    return (
        <li className="flex gap-4 border-b px-4 py-4">
            <Link
                href={`/profile/${user.username}`}
            >
                <UserAvatar user={user}/>
            </Link>
            <div className="flex flex-grow flex-col">
                <div className="flex gap-1">
                    <Link
                        href={`/profile/${user.username}`}
                        className="font-bold outline-none hover:underline focus-visible:underline"
                    >
                        {user.username}
                    </Link>
                    <span className="">-</span>
                    <span>{dateFormat(createdAt.toString())}</span>
                </div>
                <p className="whitespace-pre-wrap">{description}</p>
                <HeartButton onClick={handleToggleLike} likedByMe={likedByMe} likesCount={likes.length} />
            </div>
        </li>
    )
}
