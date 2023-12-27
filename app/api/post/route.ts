import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {

    const values = await req.json();
    const token = req.headers.get("Authorization");
    console.log(token);

    try {

        const response = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            body: values,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }
        })
        console.log(response.status)
        return Response.json({data: response}, {status: 200})
    }
    catch(error) {
        return Response.json({error: error}, {status: 500})
    }



}