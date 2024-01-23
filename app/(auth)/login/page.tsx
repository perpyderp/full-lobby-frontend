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
import { useState, useTransition } from "react"
import { FormError } from "@/components/ui/FormError"
import { FormSuccess } from "@/components/ui/FormSuccess"

import { LoginSchema } from "@/schemas"

import { login } from "@/actions/login"

export default function Login() {

    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const loginForm = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("")
        setSuccess("")

        startTransition(() => {

            login(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            // try {
            //     await signIn("credentials", {
            //         username: values.username,
            //         password: values.password,
            //         redirect: true
            //     })
            // }
            // catch(error) {
            //     toast({
            //         title: "An error has occurred when trying to sign in",
            //         description: "ERROR",
            //         variant: "destructive"
            //     })
            // }
        })
    }

    return (
        <div className="container mx-auto py-3">
            
        <Form {...loginForm}>
            <form 
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="username"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>This is your public display name.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="*******"
                                type="password"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>Enter a long and secure password</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    disabled={isPending}
                    type="submit"
                >
                    Sign In
                </Button>
            </form>
        </Form>
        </div>
    )
}