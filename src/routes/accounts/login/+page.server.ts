import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { createSession, getAccount } from '$lib/server/database';
import { formatZodError } from '$lib/utils';
import { verify } from 'argon2';
import { redirect } from "@sveltejs/kit";

const LoginForm = z.object({
    email: z.string().email(),
    password: z.string()
})

export const load = (async ({ cookies }) => {
    if (cookies.get("token")) {
        throw redirect(301, "/home");
    }
}) as PageServerLoad;

export const actions = {
    default: async ({ request, cookies }): Promise<string[]> => {
        let form = await request.formData();

        let login_form = LoginForm.safeParse(Object.fromEntries(form.entries()));

        if (!login_form.success) {
            return formatZodError(login_form.error)
        };

        let account = await getAccount(login_form.data.email);

        if (!account || !verify(account.password, login_form.data.password)) {
            return ["Invalid username or password"]
        }

        let session = await createSession(account.id);

        cookies.set("token", session.token, {path: "/"});
        throw redirect(301, "/home");
    }
} satisfies Actions;
