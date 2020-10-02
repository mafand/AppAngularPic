import { Injectable } from '@angular/core'

const KEY = 'authoToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken() {
        return !!this.getToken(); // !! retorna true ou false
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }

}