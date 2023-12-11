"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Settings() {

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/sign-in")
        },
    })

    return (
        <>
            <h1 className="text-xl">Settings</h1>
        </>
    )
}