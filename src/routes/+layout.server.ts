import { getSession, getUser } from "$lib/server/database";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({cookies, route}) => {
    let token = cookies.get("token");

    if (!token) {
        return { user: null }
    };

    let session = await getSession(token);

    console.log(session, token)

    if (!session) {
        return { user: null }
    };

    let user = await getUser(session.account_id);

    if (!user) {
        throw redirect(301, "/accounts/onboard")
    }

    return {
        user: user!
    }

}) satisfies LayoutServerLoad
