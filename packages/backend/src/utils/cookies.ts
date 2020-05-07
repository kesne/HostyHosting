import { getCurrentRequest } from './currentRequest';

export function removeUserCookie() {
    const { cookies } = getCurrentRequest();
    cookies.set('userID', '0', { httpOnly: false, signed: false });
}

export function setUserCookie(id: number) {
    const { cookies } = getCurrentRequest();
    cookies.set('userID', String(id), { httpOnly: false, signed: false });
}
