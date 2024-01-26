import { User } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { Icons } from "../Icons"
import { AvatarProps } from "@radix-ui/react-avatar"
import { UserData } from "@/types"

interface UserAvatarProps extends AvatarProps{
    user: Pick<User, "username" | "avatar"> | Pick<UserData, "username" | "avatar">
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
    return (
        <Avatar {...props}>
            {
                user.avatar?.imageUrl ? (
                    <AvatarImage src={user.avatar.imageUrl} />
                ) : (
                    <AvatarFallback>
                        <Icons.user />
                    </AvatarFallback>
                )
            }
        </Avatar>
    )
}