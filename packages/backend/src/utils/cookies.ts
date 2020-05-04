import { Cookies } from '../types';

export function removeUserCookie(cookies: Cookies) {
    cookies.set('userID', '0', { httpOnly: false, signed: false });
}

export function setUserCookie(cookies: Cookies, id: number) {
    cookies.set('userID', String(id), { httpOnly: false, signed: false });
}
