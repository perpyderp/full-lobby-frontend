import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { PostCard } from "./PostCard";

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

async function getPosts() {
    const response = await fetch("http://localhost:8080/api/posts",{
        method: "GET"
    })

    if(!response.ok) throw new Error("Error occurred fetching posts")

    return await response.json()
}

export const RecentPosts: React.FC<PostProps> = async ({className, ...props}) => {

    const posts = await getPosts();

    return (
        <div className={cn("flex flex-col py-2 px-3", className)} {...props}>
           {posts.map((post:Post) => {
            <PostCard 
                id={post.id}
                user={post.user}
                createdAt={post.createdAt}
                description={post.description}
                likeCount={post.likeCount}
                likedByMe={post.likedByMe}
            />
           })}
        </div>
        // <InfinitePostList
        //     posts={posts}
        //     isError={posts.isError}
        //     isLoading={posts.isLoading}
        //     hasMore={posts.hasNextPage}
        //     fetchNewTweets={posts.fetchNextPage}
        // />
    )
}