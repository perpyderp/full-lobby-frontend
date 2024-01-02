import Link from "next/link"
import { UserAvatar } from "./ui/UserAvatar"

import { Post } from "@/types"
import { useSession } from "next-auth/react"
import { HeartIcon } from "lucide-react"

function dateFormat(date:string) {

    const newDate = new Date(date)
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${
        newDate.getDate().toString().padStart(2, '0')
        }/${newDate.getFullYear()}`

    return formattedDate

}

export const PostCard:React.FC<Post> = ({ id, user, description, createdAt, likes, likedByMe }) => {
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
                <HeartButton likedByMe={likedByMe} likesCount={likes.length} />
            </div>
        </li>
    )
}

type HeartButtonProps = {
    likedByMe: boolean
    likesCount: number
}

const HeartButton:React.FC<HeartButtonProps> = ({ likedByMe, likesCount }) => {

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
        <button className={`group items-center gap-1 self-start flex transition-colors duration-200 ${
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