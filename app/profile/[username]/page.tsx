
import { FriendsList } from "@/components/FriendsList";
import { Icons } from "@/components/Icons";
import { RecentPosts } from "@/components/RecentPosts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { BadgeCheck, BadgeX } from "lucide-react";
import { NextPage } from "next";

interface ProfileProps {
    params: {
        username: string,
    }
}

interface UserData {
    id: string,
    username: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
    dob: string | null,
    bio: string | null,
    nickname: string | null,
    avatar: string | null,
    banner: string | null,
    verified: Boolean,
    authorities: [ { roleId: 1 | 2, authority: "USER" | "ADMIN" } ]
}

async function getUser(username:string) {

    const res = await fetch(`http://localhost:8080/api/user/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache"
    })

    if (!res.ok) throw new Error('Failed to fetch data')
   
    return res.json()
}

export const UserProfile:NextPage<ProfileProps> = async({params}) => {

    const userData:UserData = await getUser(params.username)

    const addFriend = () => {
        console.log("Add friend")
    }

    console.log(userData.id)

    return (
        <div className="max-w-screen-xl mx-auto my-8 px-8 flex flex-col gap-y-8">
            <div className="flex flex-row justify-between my-2 px-4 py-2">
                <div className="flex flex-row gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback>
                        <Icons.user />
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <div className="text-xl flex flex-row">
                        <span className="flex flex-row gap-2">
                            {userData.username}
                        {
                            userData.verified ?
                                <BadgeCheck color="#74c0fc" />
                            :
                                <BadgeCheck />
                        }
                        </span>
                    </div>
                    <div id="name" className="flex gap-1 text-muted-foreground">
                        <span id="first-name">{userData.firstName}</span>
                        <span id="last-name">{userData.lastName}</span>
                    </div>
                    <div id="bio" className="text-sm text-muted-foreground">
                        { userData.bio ? userData.bio : "No bio" }
                    </div>
                </div>
                </div>
                <div className="flex flex-col items-center">
                    <p id="player-level" className="cursor-default">Player Level: 100</p>
                    <Button>Add friend</Button>
                </div>
            </div>
            <div className="grid md:grid-cols-user-posts gap-5">
                <aside>
                    <h2 className="text-2xl">Friends</h2>
                    <FriendsList username={userData.username} />
                </aside>
                <div>
                    <h2 className="text-2xl">Posts</h2>
                    <RecentPosts userId={userData.id}/>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;