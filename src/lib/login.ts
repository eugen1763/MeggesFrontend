import {writable, type Writable} from "svelte/store";

export module Auth {
    export const password: Writable<string|null> = writable();

    export function init() {
        const password = localStorage.getItem("password");
        if (password) {
            Auth.password.set(password);
        }
    }

    export function login(password: string) {
        Auth.password.set(password);
        localStorage.setItem("password", password);
    }

    export function logout(){
        localStorage.removeItem("password");
        Auth.password.set(null);
    }
}