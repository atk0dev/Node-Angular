import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'register',
  template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h4>Register new user</h4>
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <form class="register-form">
        <mat-form-field class="input-full-width">
            <input [(ngModel)]="registerData.email" name="email" matInput placeholder="Email" type="email">
        </mat-form-field>
        <mat-form-field class="input-full-width">
            <input [(ngModel)]="registerData.password" name="password" matInput placeholder="Password" type="password">
        </mat-form-field>

        <mat-form-field class="input-full-width">
        <textarea matInput placeholder="Leave a comment"></textarea>
        </mat-form-field>
            <button (click)="post()" mat-raised-button color="primary">Register</button>
        </form>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {

    registerData = {};

  constructor (private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  post() {
      console.log(this.registerData);
      this.apiService.sendUserRegistration(this.registerData);
  }

}
