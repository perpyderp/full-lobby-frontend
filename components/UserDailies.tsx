import { cn } from "@/lib/utils"

interface UserDailiesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const UserDailies: React.FC = ({className, ...props}: UserDailiesProps) => {

    return (
        <div className={cn("", className)} {...props}>
            <h3>Username</h3>
            <h4>Daily Tasks</h4>
            <ul>
            <li>Create a post</li>
            <li>Like 5 posts</li>
            <li>Comment on a post</li>
            </ul>
            <h4>Weekly Tasks</h4>
            <ul>
            <li>Like 40 posts</li>
            <li></li>
            </ul>
        </div>
    )
}