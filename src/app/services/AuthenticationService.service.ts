import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';
import {AppConfigService } from './app-config.service'
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
    constructor(private http: HttpClient, private appConfigService: AppConfigService) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      this.appConfigService = appConfigService;
    }
    public get currentUserValue(): User {
      return this.currentUserSubject.value;
    }

    login(username, password)
    {
      let uri = `${this.appConfigService.config.apiURL}/Token`;
      const payload = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');

        return this.http.post<any>(uri, payload)
          .pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          }))
      
    }

    register(user: User) {
      let uri = `${this.appConfigService.config.apiURL}/api/account/register`;
      return this.http.post(uri, user);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}
}