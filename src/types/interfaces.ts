import { Models } from "appwrite";


export interface ISpace_Details extends Models.Document {
    name: string;
    description: string;
    active: boolean;
    //   avatarID: string | null;
    //   about: string;
    //   location: string;
    //   avatarURL: any;
    //   active: "Online" | "Offline" | "Typing";
    //   lastOnlineAt: string;
    //   statusUpdates: string;
    //   email: string;
    //   changeLog: string;
    online: boolean;
}



export interface IUserDetails extends Models.Document {
    name: string;
    userID: string;
    avatarID: string | null;
    about: string;
    location: string;
    avatarURL: any;
    status: "Online" | "Offline" | "Typing";
    lastOnlineAt: string;
    statusUpdates: string;
    email: string;
    changeLog: string;
    online: boolean;
}


export interface UserPrefs extends Models.Preferences {
    detailsDocID: string;
    shouldAlert: boolean | undefined;
}