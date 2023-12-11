"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { useSession } from "next-auth/react";

interface ProfileProps {
    params: {
        slug: string,
    }
    avatar: string,
}

const Profile: React.FC<ProfileProps> = ({params, avatar}) => {

    const { data: session, status } = useSession();

    if(session && session.user.username === params.slug) {
        return (
            <div>
                <h2 className="text-lg">{session.user.username}</h2>
            </div>
        )
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col">
                <div className="flex flex-row space-x-4">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                    <h2 className="text-3xl">{session?.user.username}</h2>
                    <div >
                        Player Level: 100
                    </div>
                </div>

                <div>Name: <span>{session?.user.firstName + " " + session?.user.lastName}</span></div>
                <div>Birthday: <span>{session?.user.dob}</span></div>
                <div>
                    {
                        session?.user.bio ?
                        <>
                            {session?.user.bio}
                        </> :
                        <>
                            No bio
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;