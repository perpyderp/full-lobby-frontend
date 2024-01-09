"use client"

import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { Post } from "@/types/index"
import { useSession } from "next-auth/react";
import useSWRInfinite from 'swr/infinite'

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const session = useSession()

    if(session.status === "loading") return "Loading..."

    return <PostsList accessToken={session.data?.user.accessToken}/>

}

interface PostsListProps {
    accessToken?: string | null
}

function dateFormat(date:string) {

    const newDate = new Date(date)
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${
        newDate.getDate().toString().padStart(2, '0')
        }/${newDate.getFullYear()}`

    return formattedDate

}

const PostsList:React.FC<PostsListProps> = ({ accessToken }) => {

    const session = useSession()
    const token = session.data?.user.accessToken

    const PAGE_SIZE = 10
    
    const fetcher = (url:string, options:RequestInit) => fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization:`Bearer ${token}`})
        }
    }).then(async(res) => {
        return res.json()
    });

    const getKey = (pageIndex:number) => {
        return `http://localhost:8080/api/posts/paginated?page=${pageIndex}&size=${PAGE_SIZE}`
    }

    const { data, isLoading, error, size, setSize } = useSWRInfinite(getKey, (url:string, options:RequestInit) => fetcher(url, options))

    const posts:Post[] = data ? data.flatMap(page => page.content) : [];

    const loadMorePosts = () => {
        setSize(size + 1)
    }

    return (
        <InfinitePostList
            isLoading={isLoading}
            isError={error}
            posts={posts}
            hasMore={
                data ? 
                !data[data.length-1].last : false
            }
            loadMorePosts={loadMorePosts}
        />
    )
}