"use client"

import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { PaginatedPostResponse, Post } from "@/types/index"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useSWRInfinite from 'swr/infinite'
import Link from "next/link";
import { UserAvatar } from "./ui/UserAvatar";
import { HeartButton } from "./HeartButton";
import { Button } from "./ui/Button";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const session = useSession()

    if(session.status === "loading") return "Loading..."

    return <PostsList accessToken={session.data?.user.accessToken} />

}

interface PostsListProps {
    accessToken?: string | null
}

const fetcher = (url:string) => fetch(url).then(async(res) => {
    return res.json()
});

function dateFormat(date:string) {

    const newDate = new Date(date)
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${
        newDate.getDate().toString().padStart(2, '0')
        }/${newDate.getFullYear()}`

    return formattedDate

}

const PostsList:React.FC<PostsListProps> = ({ accessToken }) => {

    const session = useSession()
    const user = session.data?.user

    // useEffect(() => {
    //     getPosts()
    // }, [])

    const [page, setPage] = useState(0)
    // const [hasMore, setHasMore] = useState(true)
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [posts, setPosts] = useState<Post[]>([])
    // const [error, setError] = useState<boolean>(false)

    const pageSize = 10

    const getKey = (pageIndex:number, previousPageData:Post[]) => {
        if (previousPageData && !previousPageData.length) return null       
        console.log(pageIndex)
        return `http://localhost:8080/api/posts`
    }

    const { data, isLoading, error, size, setSize } = useSWRInfinite(getKey, fetcher)

    // async function getPosts() {
    //     setIsLoading(true)
    //     const token = accessToken

    //     if(token !== undefined || null) {

    //         const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
    //             method: "GET",
    //             headers: {
    //                 "Authorization": `Bearer ${token}`,
    //                 "Content-Type": "application/json",
    //             },
    //             next: {
    //                 tags: ["posts"]
    //             }
    //         })  
        
    //         if(!response.ok) throw new Error("Error occurred fetching posts")
        
    //         const data = await response.json()
    //         // console.log(data)
    //         setPosts((prevPosts:Post[]) => [...prevPosts, ...data.content]);
    //         setPage(page + 1);
    //         setHasMore(!data.last); // Stop fetching if it's the last page
    //         setIsLoading(false)
        
    //         return data
    //     }
    //     else {
    //         const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
    //             method: "GET",
    //             next: {
    //                 tags: ["posts"]
    //             }
    //         })  
        
    //         if(!response.ok) throw new Error("Error occurred fetching posts")
        
    //         const data = await response.json()
    //         // console.log(data)
    //         setPosts((prevPosts:Post[]) => [...prevPosts, ...data.content]);
    //         setPage(page + 1);
    //         setHasMore(!data.last); // Stop fetching if it's the last page
    //         setIsLoading(false)
        
    //         return data
    //     }
    // }
    // console.log(data)
    

    if(isLoading) return <h1 className="text-2xl">Loading...</h1>
    if(!data) return <h1>Loading data</h1>

    const isLoadingMore =
      isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
      isEmpty || (data && data.length-1 < pageSize);

    return (
        <ul className="">
            {
                data.map((posts:Post[]) => {
                    return posts.map((post) => {
                        return (
                            <li key={post.id} className="flex gap-4 border-b px-4 py-4">
                                <Link
                                    href={`/profile/${post.user.username}`}
                                >
                                    <UserAvatar user={post.user}/>
                                </Link>
                                <div className="flex flex-grow flex-col">
                                    <div className="flex gap-1">
                                        <Link
                                            href={`/profile/${post.user.username}`}
                                            className="font-bold outline-none hover:underline focus-visible:underline"
                                        >
                                            {post.user.username}
                                        </Link>
                                        <span className="">-</span>
                                        <span>{dateFormat(post.createdAt.toString())}</span>
                                    </div>
                                    <p className="whitespace-pre-wrap">{post.description}</p>
                                    <HeartButton id={post.id} likedByMe={post.likedByMe} likesCount={post.likes.length} />
                                </div>
                            </li>
                        )
                    })
                })
            }
            <Button onClick={() => setSize(size+1)}>          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}</Button>
        </ul>
    )

    // return (
    //     <InfinitePostList
    //         isLoading={isLoading}
    //         isError={error}
    //         posts={data}
    //         hasMore={false }
    //         fetchNewPosts={() => setSize(size+1)}
    //     />
    // )
}