import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const searchParams = req.nextUrl.searchParams
    const pageParam = searchParams.get('page')

    const response = await fetch(`http://localhost:8080/api/posts/paginated?page=${pageParam}&size=10`,{
        method: "GET",
        cache: "no-cache"
    })  

    if(!response.ok) throw new Error("Error occurred fetching posts")

    const data = await response.json()
    // console.log(data)

    return NextResponse.json(data, {status: 200})

}