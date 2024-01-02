type Post = {
    id: string
    description: string
    createdAt: Date
    likeCount: number
    likedByMe: boolean
    user: {
        id: string
        avatar: string | null
        username: string | null
    }
}