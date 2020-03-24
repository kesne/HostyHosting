import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const HAS_USER_COOKIE = 'hasUser';

function get() {
    return cookie.get(HAS_USER_COOKIE) === '1';
}

type Callback = (value: boolean) => void;

let current = get();
const watchers = new Set<Callback>();
function subscribe(callback: Callback) {
    watchers.add(callback);
    return () => {
        watchers.delete(callback);
    };
}

function notify() {
    watchers.forEach(cb => cb(current));
}

export function checkCookies() {
    let next = get();
    if (next !== current) {
        current = next;
        notify();
    }
}

// TODO: This should redirect ???
export function signOut() {
    cookie.remove(HAS_USER_COOKIE);
    checkCookies();
}

export function getHasUser() {
    return current;
}

export function useHasUser() {
    const [hasUser, setHasUser] = useState(current);

    useEffect(() => subscribe(value => setHasUser(value)), []);

    return hasUser;
}
