import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"
import { PostCard } from "./PostCard";
import { Post } from "@/types/index"

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

async function getPosts() {
    const response = await fetch("http://localhost:8080/api/posts",{
        method: "GET",
        cache: "no-cache"
    })

    if(!response.ok) throw new Error("Error occurred fetching posts")

    const data = await response.json()

    return data
}

export const RecentPosts: React.FC<PostProps> = async ({className, ...props}) => {

    const posts = await getPosts();
    console.log(posts)

    return (
        <div className={cn("flex flex-col py-2 px-3", className)} {...props}>
            <ul className="flex flex-col gap-2">
                { posts.map((post:Post) => {
                    return (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            likes={post.likes}
                            likedByMe={post.likedByMe}
                            description={post.description}
                            user={post.user}
                            createdAt={post.createdAt}
                        />
                    )
                })}
           </ul>
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