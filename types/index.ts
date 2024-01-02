import { User } from "next-auth/"

export type Post = {
    id: string
    description: string
    createdAt: Date
    likes: Like[]
    likedByMe: boolean
    user: {
        id: string
        username: string | null
        avatar: string | null

    }
}

export type Like = {
    id: string
    userId: string
    postId: string
}