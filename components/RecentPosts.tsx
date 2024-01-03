"use client"

import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { Post } from "@/types/index"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const session = useSession()

    if(session.status === "loading") return "Loading..."

    return <PostsList accessToken={session.data?.user.accessToken} />

}

interface PostsListProps {
    accessToken?: string | null
}

const PostsList:React.FC<PostsListProps> = ({ accessToken }) => {

    useEffect(() => {
        getPosts()
    }, [])

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post[]>([])
    const [error, setError] = useState<boolean>(false)

    async function getPosts() {
        setIsLoading(true)
        const token = accessToken

        if(token !== undefined || null) {

            const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                next: {
                    tags: ["posts"]
                }
            })  
        
            if(!response.ok) throw new Error("Error occurred fetching posts")
        
            const data = await response.json()
            // console.log(data)
            setPosts((prevPosts:Post[]) => [...prevPosts, ...data.content]);
            setPage(page + 1);
            setHasMore(!data.last); // Stop fetching if it's the last page
            setIsLoading(false)
        
            return data
        }
        else {
            const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
                method: "GET",
                next: {
                    tags: ["posts"]
                }
            })  
        
            if(!response.ok) throw new Error("Error occurred fetching posts")
        
            const data = await response.json()
            // console.log(data)
            setPosts((prevPosts:Post[]) => [...prevPosts, ...data.content]);
            setPage(page + 1);
            setHasMore(!data.last); // Stop fetching if it's the last page
            setIsLoading(false)
        
            return data
        }


    }

    return (
        <InfinitePostList
            isLoading={isLoading}
            isError={error}
            posts={posts}
            hasMore={hasMore}
            fetchNewTweets={getPosts}
        />
    )
}