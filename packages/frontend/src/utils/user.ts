import { useState, useEffect } from 'react';
import cookie from 'js-cookie';

const USER_COOKIE = 'userID';

function get() {
    return cookie.get(USER_COOKIE) !== '0';
}

export function getUserID() {
    return cookie.get(USER_COOKIE);
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
        return true;
    }
    return false;
}

// TODO: This should redirect ???
export function signOut() {
    cookie.remove(USER_COOKIE);
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
