import { Context as KoaContext } from 'koa';
import { User, AuthType } from './entity/User';

export type Session = {
    userID: number;
    type: AuthType;
};
export type Cookies = KoaContext['cookies'];

export type Context = {
    user: User;
    session: Session;
    cookies: Cookies;
    destroySession(): void;
};

export type Lazy<T> = T | Promise<T>;
