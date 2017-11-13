import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AuthService {

    path: any = environment.path + '/auth';
    TOKEN_KEY = 'token';

    constructor (private http: HttpClient) {
    }

    get token() {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    registerUser(registerData) {
        this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
            this.saveToken(res.token);
        });
    }

    loginUser(loginData) {
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            this.saveToken(res.token);
        });
    }

    saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
}

