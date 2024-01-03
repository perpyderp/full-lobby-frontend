import { User } from "next-auth/"

export type Post = {
    id: string
    description: string
    createdAt: Date
    likes: Like[]
    likedByMe: boolean
    user: UserData
}

export type Like = {
    id: string
    userId: string
    postId: string
}

export type Avatar = {
    imageId: string | null,
    imageName: string | null,
    imageType: string | null,
    imageUrl: string | null
}

export type UserData = {
    id: string,
    avatar: Avatar,
    username: string
}