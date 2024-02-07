import {get} from "svelte/store";
import {Auth} from "$lib/login";

export module Api {
    const apiUrl = "https://api.keinemachtdendrogen.de/"

    export async function getCodes(): Promise<string[]> {
        const response = await call('getCodes', {});
        const text = await response.text();

        if (text) {
            return JSON.parse(text);
        } else {
            return [];
        }
    }

    export async function addCode(code: string) {
        await call('addCode', {code: code});
    }

    export async function deleteCode(code: string) {
        await call('deleteCode', {code: code});
    }

    async function call(route: string, body: any): Promise<Response> {
        body['auth'] = get(Auth.password);

        return fetch(apiUrl + route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}