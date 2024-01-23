
import InfiniteScroll from "react-infinite-scroll-component"
import { Post } from "@/types/index"
import { PostCard } from "./PostCard"
import { PostSkeleton } from "./ui/PostSkeleton"
import { KeyedMutator } from "swr"

type InfinitePostListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    loadMorePosts: () => void
    posts?: Post[]
}

export const InfinitePostList:React.FC<InfinitePostListProps> = ({ posts, isLoading, isError, hasMore, loadMorePosts }) => {

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
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<PostSkeleton />}
            >
                {posts.map((post) => {
                    return (
                        <PostCard
                            key={post.id}
                            post={post}
                        />
                    )
                })}
            </InfiniteScroll>
        </ul>
    )
}