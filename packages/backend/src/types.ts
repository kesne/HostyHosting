import { Context as KoaContext } from 'koa';
import { User, AuthType } from './entity/User';
import { Organization } from './entity/Organization';

export type Session = {
    userID: number;
    type: AuthType;
};
export type Cookies = KoaContext['cookies'];

export type Context = {
    user: User;
    organization: Organization;
    session: Session;
    cookies: Cookies;
};
