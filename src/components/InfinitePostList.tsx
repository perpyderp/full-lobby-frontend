
import InfiniteScroll from "react-infinite-scroll-component"
import { Post } from "@/types/index"
import { PostCard } from "./PostCard"
import { PostSkeleton } from "./ui/PostSkeleton"

type InfinitePostListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    loadMorePosts: () => void
    posts?: Post[]
}

export const InfinitePostList:React.FC<InfinitePostListProps> = ({ posts, isLoading, isError, hasMore, loadMorePosts }) => {

    if(isLoading) return <PostSkeleton />
    if(isError) return <h2 className="text-center text-xl my-4">Oops. Something went wrong...</h2>
    if(posts == null || posts.length === 0) {
        return (
            <h2 className="text-center text-xl my-4">
                That&apos;s it! You&apos;ve reached the end of the journey.
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