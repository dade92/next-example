import {query} from "./db";

export interface MyEvent {
    id: string,
    message: string
}

export const getEvents = async (): Promise<MyEvent[]> =>
    query<MyEvent[]>(
        `select ID as id, event_message as message from EVENTS`,
        []
    );