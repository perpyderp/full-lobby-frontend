
export type Post = {
    id: string
    title: string
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
    avatar: Avatar | null,
    username: string
}

export type PaginatedPostResponse = {
    content: Post[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: boolean,
    numberOfElements: number,
    empty: boolean
}

export type Role = {
    roleId: number,
    authority: "USER" | "ADMIN"
}