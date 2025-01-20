export const SERVER = {
    ENDPOINT: import.meta.env.VITE_ENDPOINT,
    PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
    DATABASE_ID: import.meta.env.VITE_DATABASE_ID,
    BUCKET_ID_USER_AVATARS: "user-avatars",
    COLLECTION_ID_SPACES: "678e78510016a9dc1b81",
    COLLECTION_ID_USERS: "678ae9860036891d08fe",
    FUNCTION_ID_FUNCS: "funcs",
    OAUTH_SUCCESS: import.meta.env.VITE_OAUTH_SUCCESS,
    OAUTH_FAILURE: import.meta.env.VITE_OAUTH_FAILURE,
} as const;
