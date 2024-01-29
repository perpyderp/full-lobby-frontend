"use client"

import { InfinitePostList } from "./InfinitePostList"
import { Post } from "@/types/index"
import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";
import { KeyedMutator } from "swr";
import useSWRInfinite from 'swr/infinite'

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {
    userId?: string
}

export const RecentPosts: React.FC<PostProps> = ({className, userId, ...props}) => {

    const session = useSession()

    if(session.status === "loading") return "Loading..."

    return <PostsList accessToken={session.data?.user.accessToken} userId={userId} />

}

interface PostsListProps {
    accessToken?: string | null
    userId?: string
}

interface MutatePostsContext {
    mutatePosts: KeyedMutator<any []>
}

const MutatePostsContext = createContext<MutatePostsContext | undefined>(undefined)

export const useMutatePostsContext = () => {
    const mutatePostsContext = useContext(MutatePostsContext)
    if(mutatePostsContext === undefined) throw new Error("mutatePostsContext must be inside a MutatePostsProvider")
    return mutatePostsContext
}

const PostsList:React.FC<PostsListProps> = ({ accessToken, userId }) => {

    const token = accessToken

    const PAGE_SIZE = 10
    
    const fetcher = (url:string, options:RequestInit) => fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization:`Bearer ${token}`})
        }
    }).then(async(res) => {

        if(res.ok) return res.json()

        const resWithoutToken = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        return resWithoutToken.json()
        
    });

    const getKey = (pageIndex:number) => {
        if(userId) return `http://localhost:8080/api/posts/paginated?page=${pageIndex}&size=${PAGE_SIZE}&userid=${userId}`
        return `http://localhost:8080/api/posts/paginated?page=${pageIndex}&size=${PAGE_SIZE}`
    }

    const { data, isLoading, error, size, setSize, mutate:mutatePosts } = useSWRInfinite(getKey, (url:string, options:RequestInit) => fetcher(url, options))

    const posts:Post[] = data ? data.flatMap(page => page.content) : [];

    const loadMorePosts = () => {
        setSize(size + 1)
    }

    return (
        <MutatePostsContext.Provider value={{mutatePosts}}>
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
        </MutatePostsContext.Provider>
    )
}