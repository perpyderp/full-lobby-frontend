"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input";
import { useRouter } from 'next/navigation'

import { toast } from "@/components/ui/UseToast"

const formSchema = z.object({
    username: z
        .string()
        .min(2, { message: "Username must be longer than 2 characters"})
        .max(50),
    email: z
        .string()
        .min(2, { message: "Email is not" })
        .email("Not a valid email"),
    password: z
        .string()
        .min(8, { message: "Password must be longer than 8 characters"})
        .regex(/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}/)
})

export default function Register() {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json"
            }
        })

        // console.log(response);
        const user = await response.json();
        console.log(user);
        router.push("/sign-in")

    }

    return (
        <div className="container mx-auto py-3">
            
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormDescription>For verification and recovery</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>Enter a long and secure password</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create account</Button>
            </form>
        </Form>
        </div>
    )
}