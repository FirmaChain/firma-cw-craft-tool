import { add, Duration } from 'date-fns';
import Cookies from 'js-cookie';

const KEY_ACCESS_TOKEN = 'access_token';
const COOKIE_HOST = document.location.hostname;
const isHTTPS = document.location.protocol === 'https:';
const COOKIE_OPTIONS = { domain: COOKIE_HOST, secure: isHTTPS };

export const getAccessToken = () => {
    return Cookies.get(KEY_ACCESS_TOKEN);
};

export const setAccessToken = (token: string, expires?: Duration) => {
    if (!token) return;
    if (!expires) expires = { minutes: 14 };

    Cookies.set(KEY_ACCESS_TOKEN, token, { ...COOKIE_OPTIONS, expires: add(new Date(), expires) });
};

export const removeAccessToken = () => {
    Cookies.remove(KEY_ACCESS_TOKEN, COOKIE_OPTIONS);
};
