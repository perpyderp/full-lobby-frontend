"use client"

import { useSession } from "next-auth/react"
import { Button } from "./ui/Button"
import { Skeleton } from "./ui/Skeleton"

interface ProfileOptionProps {
    profileUserId: string | null
}

export const ProfileOptions:React.FC<ProfileOptionProps> = ({ profileUserId }) => {

    const { data:session, status } = useSession()

    if(status === "loading") return <Skeleton />

    if(profileUserId === session?.user.id) {
        return <Button>Edit Profile</Button>
    }

    if(status === "authenticated") return <Button>Add Friend</Button>

    return null

}