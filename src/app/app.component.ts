import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { SocialUser } from '@abacritt/angularx-social-login';
import { AuthService } from './core/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  menuItem = [
    {
      label: 'Login',
      route: 'login',
    },
    {
      label: 'Note',
      route: 'note',
    },
  ];

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService,
  ) {
    this.user = new SocialUser();
    this.loggedIn = false;
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.authService.setUser(user);
      this.loggedIn = user != null;
    });
  }
}
