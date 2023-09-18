import { IProfile } from "./profile";

export interface IActivity {
    id: string,
    title: string,
    date: Date | null,
    description: string,
    city: string,
    venue: string,
    category: string,
    hostUsername? : string;
    isCancelled : boolean;
    isGoing : boolean;
    isHost : boolean;
    host? : IProfile;
    attendees : IProfile[];
}