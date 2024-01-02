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
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "@/components/ui/UseToast"
import { LoginSchema } from "@/schemas"

export default function Register() {

    const [isLoading, setIsLoading] = useState<Boolean>(false)

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    
    const login = async (values: z.infer<typeof LoginSchema>) => {
        setIsLoading(true)
        try {
            await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: true
            })
        }
        catch(error) {
            toast({
                title: "An error has occurred when trying to sign in",
                description: "ERROR",
                variant: "destructive"
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-3">
            
        <Form {...form}>
            <form onSubmit={form.handleSubmit(login)} className="space-y-8">
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
                <Button 
                    type="submit"
                >
                    Sign In
                </Button>
            </form>
        </Form>
        </div>
    )
}