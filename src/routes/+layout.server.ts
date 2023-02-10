import type { LayoutServerLoad } from "./$types";
import { getSession, getUser } from "$lib/server/database";

export const load = (async ({cookies}) => {
    let token = cookies.get("token");

    if (!token) {
        return { user: null }
    };

    let session = await getSession(token);

    if (!session) {
        return { user: null }
    };

    return {
        user: (await getUser(session.account_id))!
    }

}) satisfies LayoutServerLoad
