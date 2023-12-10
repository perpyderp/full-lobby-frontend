import { cn } from "@/lib/utils"
import { Post } from "./Post"

interface PostsProps extends React.HTMLAttributes<HTMLDivElement>{ }

export const Posts: React.FC<PostsProps> = ({className, ...props}) => {

    return (
        <div id="posts" className={cn("flex flex-col gap-2 justify-center items-center md:col-start-4 md:col-end-8", className)} {...props}>
            <Post />
        </div>
    )
}