
import InfiniteScroll from "react-infinite-scroll-component"
import { Post } from "@/types/index"
import { PostCard } from "./PostCard"
import { PostSkeleton } from "./ui/PostSkeleton"

type InfinitePostListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    fetchNewPosts: () => Promise<any[] | undefined>
    posts?: Post[]
}

export const InfinitePostList:React.FC<InfinitePostListProps> = ({ posts, isLoading, isError, hasMore, fetchNewPosts }) => {

    if(isLoading) return <PostSkeleton />
    if(isError) return <h1>Error occurred...</h1>
    if(posts == null || posts.length === 0) {
        return (
            <h2 className="text-center text-2xl my-4">
                No posts found
            </h2>
        )
    }

    return (
        <ul>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchNewPosts}
                hasMore={hasMore}
                loader={"Loading..."}
            >
                {posts.map((post) => {
                    return (
                        <PostCard
                            key={post.id}
                            {...post}
                        />
                    )
                })}
            </InfiniteScroll>
        </ul>
    )
}