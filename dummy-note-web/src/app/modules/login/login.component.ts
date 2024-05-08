import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
