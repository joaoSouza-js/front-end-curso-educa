import { AUTH_STORAGE_TOKEN } from ".";

export function saveAuthToken(token:string){
    localStorage.setItem(AUTH_STORAGE_TOKEN,token);
}