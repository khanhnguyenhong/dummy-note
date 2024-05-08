import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: SocialUser;
  isLoggedIn: boolean;
  token: string;

  constructor() {
    this.user = new SocialUser();
    this.isLoggedIn = false;
    this.token = '';

    const localUser = this.getLocal();
    if (!isEmpty(localUser)) {
      this.user = JSON.parse(localUser) as SocialUser;
      this.isLoggedIn = true;
    }
    this.token = this.getLocalToken();
  }

  setUser(user: SocialUser) {
    console.log({ user });

    this.user = user;
    this.isLoggedIn = true;

    this.setLocal(user);
  }

  setLocal(data: any) {
    localStorage.setItem('UserData', JSON.stringify(data));
  }

  getLocal() {
    return localStorage.getItem('UserData') || '';
  }

  setLocalToken(token: string) {
    this.token = token;
    console.log(token);
    localStorage.setItem('Token', token);
  }

  getLocalToken() {
    return localStorage.getItem('Token') || '';
  }
}
