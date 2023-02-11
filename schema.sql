create table accounts (
    id text primary key,
    email text unique not null,
    password text not null
);

create table users (
    account_id text references accounts(id),
    username text not null,
    avatar blob,
    avatar_format text
);

create table sessions (
    token text not null,
    account_id text references accounts(id)
);