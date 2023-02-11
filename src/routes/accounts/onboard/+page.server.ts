import type { Actions } from './$types';
import { z } from 'zod';
import { createUser, getSession } from '$lib/server/database';
import { formatZodError } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

const OnboardForm = z.object({
    username: z.string().min(4),
    avatar: z.instanceof(Buffer).optional()
})

export const actions = {
    default: async ({ request, cookies }): Promise<string[]> => {
        let token = cookies.get("token");
        console.log(token);

        if (!token) {
            throw redirect(301, "/")
        };

        let session = await getSession(token)
        console.log(session);

        if (!session) {
            throw redirect(301, "/")
        };

        let form = await request.formData();

        let onboard_form = OnboardForm.safeParse(Object.fromEntries(form.entries()));

        if (!onboard_form.success) {
            return formatZodError(onboard_form.error)
        };

        let user = await createUser(session.account_id, onboard_form.data.username)
        console.log(user);

        throw redirect(301, "/home");
    }
} satisfies Actions;
