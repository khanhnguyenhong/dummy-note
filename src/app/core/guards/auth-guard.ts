import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private route: Router,
  ) {}

  canActivate() {
    console.log(this.authService.user);
    if (!this.authService.isLoggedIn) {
      this.route.navigateByUrl('login').then(() => {});
      return false;
    } else {
      return true;
    }
  }
}
