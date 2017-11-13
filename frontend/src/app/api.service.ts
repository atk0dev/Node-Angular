import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class ApiService {

    messages = [];
    users = [];
    path = environment.path;

    constructor (private http: HttpClient) {
    }

    getMessages(userId) {
        this.http.get<any>(this.path + '/posts/' + userId).subscribe(res => {
            this.messages = res;
        });
    }

    postMessage(message) {
        console.log('going to post mesage: ');
        console.log(message);
        this.http.post(this.path + '/post', message).subscribe(res => {
            console.log('after posting message');
            console.log(res);
        });
    }

    getUsers() {
        this.http.get<any>(this.path +  '/users').subscribe(res => {
            this.users = res;
        });
    }

    getProfile(id) {
        return this.http.get(this.path + '/profile/' + id);
    }
}

