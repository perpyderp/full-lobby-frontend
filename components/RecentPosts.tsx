"use client"

import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { Post } from "@/types/index"
import { useEffect, useState } from "react";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post[]>([])
    const [error, setError] = useState<boolean>(false)

    async function getPosts() {
        setIsLoading(true)

        const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
            method: "GET",
            cache: "no-cache"
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

    useEffect(() => {
        getPosts()
    }, [])

    return (
        // <div className={cn("flex flex-col py-2 px-3", className)} {...props}>
        //     <ul className="flex flex-col gap-2">
        //         { posts.map((post:Post) => {
        //             return (
        //                 <PostCard
        //                     key={post.id}
        //                     id={post.id}
        //                     likes={post.likes}
        //                     likedByMe={post.likedByMe}
        //                     description={post.description}
        //                     user={post.user}
        //                     createdAt={post.createdAt}
        //                 />
        //             )
        //         })}
        //    </ul>
        // </div>
        <InfinitePostList
            isLoading={isLoading}
            isError={error}
            posts={posts}
            hasMore={hasMore}
            fetchNewTweets={getPosts}
        />
    )
}