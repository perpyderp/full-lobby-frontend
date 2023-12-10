import { User } from "next-auth";

interface UserNavProps {
    user: Pick<User, "name" | "image" | "email">
}

const UserNav: React.FC<UserNavProps> = ({ user }) => {
    return (
        <></>
    )
}