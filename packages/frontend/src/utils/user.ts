import cookie from 'js-cookie';
import create from 'zustand';

const USER_COOKIE = 'userID';

function get() {
    return cookie.get(USER_COOKIE) !== '0';
}

// TODO: When we refactor away having nested entities under "me", we can get rid of this.
export function getUserID() {
    return cookie.get(USER_COOKIE);
}

const [useUserStore, api] = create<{ hasUser: boolean }>(() => ({
    hasUser: get(),
}));

export function checkCookies() {
    return api.setState({ hasUser: get() });
}

// TODO: Should this redirect, or is that a concern of the consumer?
// If this needs to redirect, it would need to be a hook.
export function signOut() {
    cookie.remove(USER_COOKIE);
    checkCookies();
}

export function getHasUser() {
    return api.getState().hasUser;
}

export function useHasUser() {
    return useUserStore(state => state.hasUser);
};
