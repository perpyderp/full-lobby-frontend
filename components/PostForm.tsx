"use client"

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { TextArea } from "./ui/TextArea";
import { useSession } from "next-auth/react";
import { Button } from "./ui/Button";
import { toast } from "./ui/UseToast";
import { useState } from "react";
import { UserAvatar } from "./ui/UserAvatar";
import { User } from "next-auth/";
import { Icons } from "./Icons";


const postSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(50)
})

interface PostFormProps {
}

export const PostForm: React.FC<PostFormProps> = ({}) => {

    const session = useSession()

    if(session.status !== "authenticated") return null

    const user = session.data.user

    return <UserPostForm user={user}/>

}

interface UserPostFormProps {
    user: Pick<User, "name" | "avatar">
}

export const UserPostForm: React.FC<UserPostFormProps> = ({ user }) => {

    const session = useSession()

    const [isPostLoading, setIsPostLoading] = useState<boolean>(false)

    const postForm = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof postSchema>) => {
        const token = session.data?.user.accessToken

        try {
            setIsPostLoading(true)
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            
            if(response.status === 200) {
                toast({
                    title: "Successfully created a post!"
                })
                postForm.reset()
            }
            else {
                toast({
                    title: "Oops! Something went wrong when creating the post. Please try again"
                })
            }

        } catch(error) {
            toast({
                title: "An error occurred when trying to create post",
                description: `Error: ${error}` 
            })
        } finally {
            setIsPostLoading(false)
        }

    }

    return (
        <div className="flex border-b gap-4">
            <div className="w-full flex gap-4 px-4 py-2">
            <UserAvatar user={user}/>
            <Form {...postForm}>
                <form onSubmit={postForm.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Enter a title" {...field} disabled={isPostLoading} />
                                </FormControl>
                                <FormDescription />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={postForm.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <TextArea placeholder="Gamer moment..." {...field} disabled={isPostLoading} />    
                                </FormControl>
                                <FormDescription />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPostLoading}>
                        { isPostLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
                        Create post
                    </Button>
                </form>
            </Form>
            </div>
        </div>
    )
}