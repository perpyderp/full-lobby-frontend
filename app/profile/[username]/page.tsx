
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BadgeCheck, BadgeX } from "lucide-react";

interface ProfileProps {
    params: {
        username: string,
    }
}

interface UserData {
    id: number,
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
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function Profile({params}: ProfileProps) {

    const userData:UserData = await getUser(params.username);

    const addFriend = () => {
        console.log("Add friend")
    }

    return (    
        <div className="container mx-auto">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
            <Card className="flex flex-row justify-between px-3 py-5">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback>{userData.username}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-xl flex flex-row">
                        <span className="flex flex-row gap-2">
                            {userData.username}
                        {
                            userData.verified ?
                            <BadgeCheck /> :
                            <BadgeX />
                        }
                        </span>
                    </div>
                    <div id="bio" className="text-sm">
                        {
                            userData.bio ?
                            <>
                                {userData.bio}
                            </> :
                            <>
                                No bio
                            </>
                        }
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <p>Player Level: 100</p>
                    <Button>Add friend</Button>

                </div>

            </Card>
        </div>
    </div>
    )
}