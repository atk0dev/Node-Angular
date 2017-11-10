import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'login',
  template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h4>Login user</h4>
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <form class="register-form">
        <mat-form-field class="input-full-width">
            <input [(ngModel)]="loginData.email" name="email" matInput placeholder="Email" type="email">
        </mat-form-field>
        <mat-form-field class="input-full-width">
            <input [(ngModel)]="loginData.password" name="password" matInput placeholder="Password" type="password">
        </mat-form-field>

            <button (click)="post()" mat-raised-button color="primary">Login</button>
        </form>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['register.component.css'],
})
export class LoginComponent implements OnInit {

    loginData = {};

  constructor (private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  post() {
      this.authService.loginUser(this.loginData);
  }

}
