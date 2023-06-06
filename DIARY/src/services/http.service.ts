import { url } from "../core/types/http.types";

export class HttpService {

    async get(url: url) {
        const data = await fetch(url);
        return data.json();
    }

    delete(url: url) {
        try{
            return fetch(url, {
                method: "DELETE"
            });
        }catch {
            throw new Error("Can't delete this id");
        }
    }

    post(url: url, body: any) {
        return fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    put(url: url, body: any) {
        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}