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


const postSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(50)
})

interface PostFormProps {
}

export const PostForm: React.FC<PostFormProps> = ({}) => {

    const { data: session, status } = useSession();

    const postForm = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: "",
            description: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof postSchema>) => {
        const token = session?.user.token;
        try {
            await fetch("/api/post", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
        }
        catch(error) {
            toast({
                title: "An error occurred when trying to create post",
                description: `Error: ${error}` 
            })
        }

    }

    return (
        <div className="w-full">
            <Form {...postForm}>
                <form onSubmit={postForm.handleSubmit(onSubmit)}>
                    <FormField
                        control={postForm.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter a title" {...field}  />
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
                                    <TextArea placeholder="description" {...field} />    
                                </FormControl>
                                <FormDescription />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create post</Button>
                </form>
            </Form>
        </div>
    )
}