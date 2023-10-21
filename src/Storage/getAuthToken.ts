import { AUTH_STORAGE_TOKEN } from ".";

export function getAuthTokenInStorage() {
    const token = localStorage.getItem(AUTH_STORAGE_TOKEN);
    if (token) {
        return token;
    }
}