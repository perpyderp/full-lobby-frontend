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

import { toast } from "@/components/ui/UseToast"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/Popover"
import { Calendar } from "@/components/ui/Calendar"
import { format } from "date-fns"
import { useSession } from "next-auth/react"

const settingsFormSchema = z.object({
    firstName: z
        .string()
        .min(0)
        .max(20)
        .optional(),
    lastName: z
        .string()
        .min(0)
        .max(20)
        .optional(),
    dob: z
        .date()
        .optional(),
    username: z
        .string()
        .min(0)
        .max(50)
        .optional(),
    email: z
        .string()
        .min(0)
        .optional(),
    password: z
        .string()
        .min(0)
        .optional(),
})

export default function ProfileSettings() {

    const { data:session, status } = useSession();

    const profileSettingsForm = useForm<z.infer<typeof settingsFormSchema>>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dob: new Date(),
            username: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = async(values: z.infer<typeof settingsFormSchema>) => {
        const response = await fetch("http://localhost:8080/api/user", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session?.user.accessToken}`
            }
        })
        console.log(response);
    }
    return (
        <div className="container mx-auto">
            <div className="flex flex-col py-6">
                <h2 className="text-3xl">Settings</h2>
                <Form {...profileSettingsForm}>
                    <form onSubmit={profileSettingsForm.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex flex-row gap-4">
                        <FormField
                            control={profileSettingsForm.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileSettingsForm.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Connor" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <FormField
                            control={profileSettingsForm.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileSettingsForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="gamertag" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={profileSettingsForm.control}
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
                            control={profileSettingsForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}