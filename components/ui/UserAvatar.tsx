import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Icons } from "../Icons"

interface UserAvatarProps {
    user: Pick<User, 'name' | 'image'>
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
    return (
        <Avatar>
            {
                user.image ? (
                    <AvatarImage src={user.image} />
                ) : (
                    <AvatarFallback>
                        {user?.name}
                        <Icons.user />
                    </AvatarFallback>
                )
            }
        </Avatar>
    )
}