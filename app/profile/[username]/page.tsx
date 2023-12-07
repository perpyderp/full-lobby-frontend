import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Profile() {



    return (
        <div className="container mx-auto">
            <div className="flex flex-col">
                <div className="flex flex-row space-x-4">
                <Avatar>
                    <AvatarImage src="https://avatars.akamai.steamstatic.com/15a13489bf6f375f0c5505dd4d43a7e2ce1ac015_full.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                    <h2 className="text-3xl">Username</h2>
                    <div >
                        Player Level: 100
                    </div>
                </div>

                <div>Name: <span>First Name Last Name</span></div>
                <div>Birthday: <span>2/2/2000</span></div>
                <div>Bio: <p>Welcome to my profile! Stick around and check out what I&apos;ve made!</p></div>
            </div>
        </div>
    )
}