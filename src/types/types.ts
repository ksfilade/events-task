export interface AttendingUser {
    name: string;
    userId: string
}
export interface Event {
    id: number;
    eventName: string;
    description: string;
    date: string;
    attendingUsers: AttendingUser[];
    location: string
}