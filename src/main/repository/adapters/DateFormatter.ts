import {format} from "date-fns";

export const dateFormatter = (date: Date): string => {
    return format(date, 'dd MMM yyyy');
}