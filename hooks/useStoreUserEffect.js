import { useUser } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
/**
 * Ensures an authenticated Clerk user is persisted to the Convex backend and exposes loading/auth status.
 *
 * When the hook observes the client is authenticated it invokes the server-side `api.users.store` mutation
 * (the server reads the current auth context) and stores the returned user id in local state. The hook
 * returns two flags:
 * - `isLoading`: true while Convex auth is loading or while an authenticated user is being stored.
 * - `isAuthenticated`: true only after a server-stored user id is available.
 *
 * Note: errors from the store mutation are not caught inside the hook; on unmount or dependency changes
 * the stored id is reset to null.
 * @return {{isLoading: boolean, isAuthenticated: boolean}}
 */
export default function useStoreUserEffect() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const { user } = useUser();
    // When this state is set we know the server
    // has stored the user.
    const [userId, setUserId] = useState(null);
    const storeUser = useMutation(api.users.store);
    // Call the `storeUser` mutation function to store
    // the current user in the `users` table and return the `Id` value.
    useEffect(() => {
        // If the user is not logged in don't do anything
        if (!isAuthenticated) {
            return;
        }
        // Store the user in the database.
        // Recall that `storeUser` gets the user information via the `auth`
        // object on the server. You don't need to pass anything manually here.
        async function createUser() {
            const id = await storeUser();
            setUserId(id);
        }
        createUser();
        return () => setUserId(null);
        // Make sure the effect reruns if the user logs in with
        // a different identity
    }, [isAuthenticated, storeUser, user?.sub]);
    return {
        isLoading: isLoading || (isAuthenticated && userId === null),
        isAuthenticated: isAuthenticated && userId !== null
    };
}