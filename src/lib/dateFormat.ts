import { formatDistanceToNowStrict } from "date-fns";

export function dateFormat(date:string) {

    const createdAt = new Date(date);
    return formatDistanceToNowStrict(createdAt, { addSuffix: false });

}