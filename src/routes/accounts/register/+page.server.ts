import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { createAccount, createSession, getSession, getUser } from '$lib/server/database';
import { formatZodError } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

const LoginForm = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characeters and have one number."),
    confirm_password: z.string()
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

        if (login_form.data.password != login_form.data.confirm_password) {
            return ["Passwords do not match."]
        }

        let account = await createAccount(login_form.data.email, login_form.data.password);

        let session = await createSession(account.id);

        cookies.set("token", session.token, {path: "/"});
        throw redirect(301, "/home")
    }
} satisfies Actions;
