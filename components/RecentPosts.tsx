import { cn } from "@/lib/utils"
import { InfinitePostList } from "./InfinitePostList"

interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const posts:any = fetch("http://localhost:8080/api/posts");

    return (
        // <div className={cn("", className)} {...props}>
        //     Post
        // </div>
        <InfinitePostList
            posts={posts}
            isError={posts.isError}
            isLoading={posts.isLoading}
            hasMore={posts.hasNextPage}
            fetchNewTweets={posts.fetchNextPage}
        />
    )
}