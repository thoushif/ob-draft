 
import { Models, Query } from "appwrite";
 
import { SERVER } from "../lib/config";
import {
 
    IUserDetails,
} from "../types/interfaces";
import api from "./api";
 
export async function getSession() {
    try {
        let user = await api.getAccount();
        return user;
    } catch (error) { }
}

export async function getUserDetails(detailsDocID: string) {
    let userDoc = (await api.getDocument(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        detailsDocID,
        [Query.select(["$id", "avatarURL", "about", "name", "location"])],
    )) as IUserDetails;
    return userDoc;
}
export async function getCurrentUserDetails(
    user: Models.User<Models.Preferences>,
) {
    try {
        let userDetails = (await api.getDocument(
            SERVER.DATABASE_ID,
            SERVER.COLLECTION_ID_USERS,
            user.prefs.detailsDocID,
        )) as IUserDetails;
        return userDetails;
    } catch (error) {
        throw error;
    }
}
export async function getUsers(cursor?: string) {
    let querySet = [
        Query.orderAsc("$createdAt"),
        Query.limit(20),
        Query.select(["$id", "avatarURL", "about", "name", "location"]),
    ];
    if (cursor) {
        querySet.push(Query.cursorAfter(cursor));
    }
    const { documents, total } = await api.listDocuments(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        querySet,
    );

    return [documents, total] as [IUserDetails[], number];
}

export async function editUserDetails(
    userDetailsDocID: string,
    details: Partial<IUserDetails>,
) {
    await api.updateDocument(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        userDetailsDocID,
        { ...details },
    );
}
 
 

export async function updateUserDetails(
    userDetailsID: string,
    details: Partial<IUserDetails>,
) {
    return (await api.updateDocument(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        userDetailsID,
        details,
    )) as IUserDetails;
}

export async function deleteUserAvatar(userDetailsID: string) {
    let details = await getUserDetails(userDetailsID);
    if (details.avatarID) {
        await api.deleteFile(SERVER.BUCKET_ID_USER_AVATARS, details.avatarID);
        await updateUserDetails(userDetailsID, { avatarID: null, avatarURL: null });
    }
}

export async function uploadUserAvatar(userDetailsID: string, avatar: File) {
    let res = await api.createFile(SERVER.BUCKET_ID_USER_AVATARS, avatar);
    return await updateUserDetails(userDetailsID, {
        avatarID: res.$id,
        avatarURL: api.getFile(SERVER.BUCKET_ID_USER_AVATARS, res.$id),
    });
}

export async function updateUserAvatar(userDetailsID: string, avatar: File) {
    await deleteUserAvatar(userDetailsID);
    return await uploadUserAvatar(userDetailsID, avatar);
}

export async function setOnlineStatus(
    userDetailsID: string,
    isOnline: boolean,
) {
    return (await api.updateDocument(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        userDetailsID,
        { online: isOnline, lastSeen: new Date(Date.now()) },
    )) as IUserDetails;
}

export async function deleteUser(userID: string) {
    let deleteResponse = await api.executeFunction(SERVER.FUNCTION_ID_FUNCS, {
        action: "delete user",
        params: {
            userID,
        },
    });

    let response = JSON.parse(deleteResponse.responseBody) as {
        ok: boolean;
        message: string;
    };

    return response;
}

export async function searchUsers(name: string) {
    if (name) {
        try {
            const { documents } = await api.listDocuments(
                SERVER.DATABASE_ID,
                SERVER.COLLECTION_ID_USERS,
                [Query.search("name", name), Query.limit(4)],
            );
            return documents as IUserDetails[];
        } catch (error) {
            console.log(error);
            return [];
        }
    } else return [];
}
 
 
export const updateLastSeen = async (userDetailsID: string) => {
    await api.updateDocument<IUserDetails>(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_USERS,
        userDetailsID,
        {
            lastOnlineAt: new Date().toISOString(),
            changerID: userDetailsID,
            changeLog: "users/last-seen/update",
        },
    );
};
