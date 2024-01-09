"use server"

import { Post } from "@/types"
import { Dispatch, SetStateAction } from "react"

interface getPostsProps {
    accessToken?: string | null
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setPosts: Dispatch<SetStateAction<Post[]>>,
    setHasMore: Dispatch<SetStateAction<boolean>>,
    setPage: Dispatch<SetStateAction<number>>,
    page: number,
}

export const getPosts = async({ accessToken, setIsLoading, page, setPosts, setPage, setHasMore}:getPostsProps) => {
    setIsLoading(true)

    if(accessToken !== undefined || null) {

        const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${page}&size=10`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: {
                revalidate: 5,
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
                revalidate: 5,
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