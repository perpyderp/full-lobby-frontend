import { UserData } from "@/types"
import { UserAvatar } from "./ui/UserAvatar"
import Link from "next/link"

const getUserFriends = async(username:string) => {
    const res = await fetch(`http://localhost:8080/api/user/${username}/friends`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) throw new Error('Failed to fetch data')
   
    return res.json()
}


interface FriendsListProps {
    username: string
}

export const FriendsList: React.FC<FriendsListProps> = async({ username }) => {

    const friends = await getUserFriends(username)

    return (
        <ul className="list-none">
            { friends ? 
                friends.length > 0 ?
                    friends.map((friend:UserData) => (
                        <li key={friend.id} className="">
                            <Link
                                href={`/profile/${friend.username}`}
                                className="flex items-center gap-4 mt-2"
                            >
                                <UserAvatar user={friend} />
                                <p>{friend.username}</p>
                            </Link>
                        </li>
                    )) :
                    <li>No friends 😔</li>
                : <li>Problem loading friends</li>
            }
        </ul>
    )
}