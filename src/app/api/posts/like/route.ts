import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const body = await req.json()
    // console.log(body);
    
    const response = await fetch(`http://localhost:8080/api/posts/like`,{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })  

    if(!response.ok) throw new Error("Error liking post")

    const data = await response.json()
    // console.log(data)

    revalidateTag("posts")

    return NextResponse.json(data, {status: 200})
}