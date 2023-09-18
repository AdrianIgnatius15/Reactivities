import { IProfile } from "./interfaces/profile";
import { User } from "./user";

export class Profile implements IProfile {
    username: string = "";
    displayName: string = "";
    image?: string | undefined;
    bio?: string | undefined;

    constructor(user : User) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
    
}