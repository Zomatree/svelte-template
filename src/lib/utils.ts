import type { ZodError } from "zod"

export const tobase64 = (format: string, buf: Buffer): string => {
    return `data:${format};base64,${buf.toString('base64')}`
}

export const formatZodError = <T>(error: ZodError<T>) => {
    let form_errors = error.formErrors;

    return Object.entries(form_errors.fieldErrors).map(([_, errors]) => (errors as string)).flat()
}
