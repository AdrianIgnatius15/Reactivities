import { ActivityFormValues } from "./form-models/activityFormValues";
import { IActivity } from "./interfaces/activity";
import { IProfile } from "./interfaces/profile";

export class Activity implements IActivity {
    id: string = "";
    title: string = "";
    date: Date | null = null;
    description: string = "";
    city: string = "";
    venue: string = "";
    category: string = "";
    hostUsername?: string | undefined = "";
    isCancelled: boolean = false;
    isGoing: boolean = false;
    isHost: boolean = false;
    host?: IProfile | undefined;
    attendees: IProfile[] = [];

    constructor(init? : ActivityFormValues) {
        //Shortcut to assign properties above to the properties of "ActivityFormValues"
        Object.assign(this, init);
    }
}