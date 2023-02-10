import type { Actions } from './$types';
import { z } from 'zod';
import { createAccount, createSession } from '$lib/server/database';
import { formatZodError } from '$lib/utils';
import type { Session } from '$lib/types';

const LoginForm = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "password must be at least 8 characeters and have one number")
})

export const actions = {
    default: async ({ request }): Promise<{ success: false, errors: string[] } | { success: true, session: Session }> => {
        let form = await request.formData();

        let login_form = LoginForm.safeParse(Object.fromEntries(form.entries()));

        if (!login_form.success) {
            // let errors: string[] = [];
            // let formatted = login_form.error.format();

            // if (formatted._errors) {
            //     formatted._errors.map(v => errors.push(v))
            // };

            // if (formatted.email) {
            //     formatted.email._errors.map(v => errors.push(v))
            // };

            // if (formatted.password) {
            //     formatted.password._errors.map(v => errors.push(v))
            // };

            return { success: false, errors: formatZodError(login_form.error) }
        };

        let account = await createAccount(login_form.data.email, login_form.data.password);
        let session = await createSession(account.id);

        return { success: true, session }

    }
} satisfies Actions;
