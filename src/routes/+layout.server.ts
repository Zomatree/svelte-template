import { getAccountById, getSession, getUser } from "$lib/server/database";
import type { User, Account } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({cookies, route}): Promise<{ user: User, account: Account } | { user: null, account: null }> => {
    let token = cookies.get("token");

    if (!token) {
        return { user: null, account: null }
    };

    let session = await getSession(token);

    console.log(session, token)

    if (!session) {
        return { user: null, account: null }
    };

    let user = await getUser(session.account_id);

    if (!user) {
        throw redirect(301, "/accounts/onboard")
    }

    let account = await getAccountById(user.account_id);

    return {
        user: user!,
        account: account!
    }

}) satisfies LayoutServerLoad
