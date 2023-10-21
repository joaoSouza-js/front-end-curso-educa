export function getAuthTokenInStorage() {
    const token = localStorage.getItem('token');
    if (token) {
        return token;
    }
}