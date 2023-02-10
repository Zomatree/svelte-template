export interface Account {
    id: string,
    email: string,
    password: string
};

export interface User {
    account_id: string,
    username: string,
    avatar: Buffer | null,
    avatar_format: string | null,
}

export interface Session {
    token: string,
    account_id: string
}
