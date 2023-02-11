import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
    default: async ({ cookies }) => {
        cookies.delete("token");
        throw redirect(307, "/accounts/login");
    }
} satisfies Actions;
