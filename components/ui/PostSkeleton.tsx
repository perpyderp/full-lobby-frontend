
import { Skeleton } from "@/components/ui/Skeleton"

export const PostSkeleton:React.FC = () => {
    return (
        <div>
            <div className="flex gap-4 border-b px-4 py-4">
                <Skeleton className="w-[40px] h-[40px] rounded-full" />
                <div className="flex flex-grow flex-col gap-2">
                    <div className="flex gap-4">
                        <Skeleton className="w-full h-[20px] rounded-full" />
                    </div>
                    <Skeleton className="w-full h-[20px] rounded-full" />
                </div>
            </div>
        </div>
    )
}