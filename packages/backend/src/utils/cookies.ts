import { getCurrentRequest } from './currentRequest';

export function removeUserCookie() {
    const { cookies } = getCurrentRequest();
    cookies.set('userID', '0', { httpOnly: false, signed: false });
}

export function setUserCookie(id: string) {
    const { cookies } = getCurrentRequest();
    cookies.set('userID', id, { httpOnly: false, signed: false });
}
