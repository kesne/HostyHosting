import cookie from 'js-cookie';
import create from 'zustand';

const USER_COOKIE = 'userID';

function get() {
    return cookie.get(USER_COOKIE) !== '0';
}

const [useUserStore, api] = create<{ hasUser: boolean }>(() => ({
    hasUser: get(),
}));

export function checkCookies() {
    const hasUser = get();
    if (api.getState().hasUser !== hasUser) {
        api.setState({ hasUser: get() });
        return true;
    }
    return false;
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
