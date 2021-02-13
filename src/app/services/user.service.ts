import {  Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import {AppConfigService } from './app-config.service'

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private appConfigService: AppConfigService) {

    }

    register(user: User) {
        return this.http.post('${config.apiUrl}/users/register', user);
    }
}