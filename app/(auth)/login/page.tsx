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

import { LoginSchema } from "@/schemas"

import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/UseToast"
import { Icons } from "@/components/Icons"
import { useRouter } from "next/navigation"

export default function Login() {

    const router = useRouter()

    const [error, setError] = useState<string | undefined>()
    const [isPending, startTransition] = useTransition()

    const loginForm = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })
    
    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {

        const validatedFields = LoginSchema.safeParse(values)

        if(!validatedFields.success){
            return { error: "Invalid fields!" }
        }
    
        const { username, password } = validatedFields.data

        setError("")

        startTransition(async() => {

            try {
                await signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false
                })
                .then((data) => {
                    if(data?.error) {
                        console.log(data.error)
                        switch(data.error) {
                            case "CredentialsSignin":
                                setError("Invalid credentials")
                            default:
                                setError("Something went wrong")
                        }
                    }
                    if(data?.ok) router.push("/")
                })
                
            }
            catch(error) {
                toast({
                    title: "An error has occurred when trying to sign in",
                    description: "" + error,
                    variant: "destructive"
                })
            }
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
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                {/* <FormSuccess message={success} /> */}
                <Button
                    disabled={isPending}
                    type="submit"
                >
                    { isPending && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
                    Sign In
                </Button>
            </form>
        </Form>
        </div>
    )
}