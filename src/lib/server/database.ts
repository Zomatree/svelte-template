import db from "better-sqlite3";
import { hash, verify } from "argon2";
import { randomBytes } from "crypto";
import type { Account, User, Session } from "$lib/types";

export const database = db("database.db")

export const generateId = () => {
    return randomBytes(20).toString("hex")
}

export const createAccount = async (email: string, password: string) => {
    let account: Account = {
        id: generateId(),
        email: email,
        password: await hash(password)
    };

    database
        .prepare<[string, string, string]>("insert into accounts(id, email, password) values (?, ?, )")
        .run(account.id, account.email, account.password);

    return account
}

export const getAccount = async (email: string) => {
    return database
        .prepare<string>("select * from accounts where email=?")
        .get(email) as Session | undefined;
}

export const createUser = async (account_id: string, username: string) => {
    let user: User = { account_id, username, avatar: null, avatar_format: null };

    database
        .prepare<[string, string]>("insert into users(account_id, username) values(?, ?)")
        .run(user.account_id, user.username);

    return user
}

export const getUser = async (account_id: string) =>  {
    return database
        .prepare<string>("select * from users where account_id=?")
        .get(account_id) as User | undefined;
}

export const createSession = async (account_id: string) => {
    let session: Session = {
        token: generateId(),
        account_id
    };

    database
        .prepare<[string, string]>("insert into sessions(token, account_id) values(?, ?)")
        .run(session.token, session.account_id);

    return session
}

export const getSession = async (token: string) => {
    return database
        .prepare<string>("select * from sessions where token=?")
        .get(token) as Session | undefined;
};
