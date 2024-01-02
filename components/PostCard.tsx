import Link from "next/link"
import { Card, CardContent, CardHeader } from "./ui/Card"
import { UserAvatar } from "./ui/UserAvatar"

export const PostCard:React.FC<Post> = ({ id, user, description, createdAt, likeCount, likedByMe }) => {
    return (
        <Card>
            <CardHeader>
                <Link
                    href={`/profile/${user.username}`}
                >
                    <UserAvatar user={user}/>
                    
                </Link>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}