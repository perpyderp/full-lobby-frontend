"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form"
import { Input } from "@/components/ui/Input";
import { useRouter } from 'next/navigation'

import { registerSchema } from "@/schemas"
import { FormError } from "@/components/ui/FormError"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"
import { FormSuccess } from "@/components/ui/FormSuccess"
import { Icons } from "@/components/Icons"

export default function Register() {

    const router = useRouter()

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
    })
    
    async function onSubmit(values: z.infer<typeof registerSchema>) {
        startTransition(() => {

            register(values)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)

                if(data.success) {
                    setTimeout(() => {
                        router.push("/login")
                    }, 5000)
                }
            })

        })

    }

    return (
        <div className="container mx-auto py-3">
            
        <Form {...registerForm}>
            <form 
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    type="submit"
                    disabled={isPending}
                >
                    { isPending && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
                    Create account
                </Button>
            </form>
        </Form>
        </div>
    )
}