import { cn } from "@/lib/utils"



interface PostProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Post: React.FC<PostProps> = ({className, ...props}) => {

    return (
        <div className={cn("", className)} {...props}>
            Post
        </div>
    )
}