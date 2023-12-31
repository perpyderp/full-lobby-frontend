import { cn } from "@/lib/utils"



interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const RecentPosts: React.FC<PostProps> = ({className, ...props}) => {

    const posts = []

    return (
        // <div className={cn("", className)} {...props}>
        //     Post
        // </div>
        <InfinitePostList posts={posts} />
    )
}