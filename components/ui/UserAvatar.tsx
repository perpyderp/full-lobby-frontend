import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Icons } from "../Icons"
import { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps{
    user: Pick<User, 'name' | 'avatar'>
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {
                user.avatar ? (
                    <AvatarImage src={user.avatar} />
                ) : (
                    <AvatarFallback>
                        {user.name}
                        <Icons.user />
                    </AvatarFallback>
                )
            }
        </Avatar>
    )
}