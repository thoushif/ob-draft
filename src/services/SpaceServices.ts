import { Query } from "appwrite";
import { SERVER } from "../lib/config";
import api from "./api";
import { ISpace_Details } from "../types/interfaces";

export const getActiveSpaces = async (): Promise<ISpace_Details[]> => {


    let { documents } = await api.listDocuments(
        SERVER.DATABASE_ID,
        SERVER.COLLECTION_ID_SPACES,
        [
            // Query.equal("$id", [...chatIDs]),
            Query.orderDesc("$updatedAt"),
            Query.limit(10),
        ],
    );
    console.log("documents", documents);
    return documents as ISpace_Details[];
}