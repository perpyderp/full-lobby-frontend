
import InfiniteScroll from "react-infinite-scroll-component"

type Post = {
    id: string
    description: string
    createdAt: Date
    likeCount: number
    likedByMe: boolean
    user: {
        id: string
        image: string | null
        name: string | null
    }
}

type InfinitePostListProps = {
    isLoading: boolean
    isError: boolean
    hasMore: boolean
    fetchNewTweets: () => Promise<unknown>
    posts: Post[]
}

export const InfinitePostList: React.FC<InfinitePostListProps> = ({ posts, isLoading, isError, hasMore, fetchNewTweets }) => {

    if(isLoading) return <h1>Loading</h1>
    if(isError) return <h1>Error occurred...</h1>
    if(posts == null || posts.length === 0) {
        <h2 className="text-center text-2xl my-4">
            No posts found
        </h2>
    }

    return (
        <ul>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchNewTweets}
                hasMore={hasMore}
                loader={"Loading"}
            >
                {posts.map((post) => {
                    <div key={post.id}>
                        {post.description}
                    </div>
                })}
            </InfiniteScroll>
        </ul>
    )
}