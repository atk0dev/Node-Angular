import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      <button mat-button routerLink="/">My app</button>
      <button mat-button routerLink="/users">Users</button>
      <span style="flex: 1 1 auto"></span>
      <button *ngIf="!authService.isAuthenticated" mat-button routerLink="/register">Register</button>
      <button *ngIf="!authService.isAuthenticated" mat-button routerLink="/login">Login</button>
      <button *ngIf="authService.isAuthenticated" mat-button (click)="authService.logout()">Logout</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  title = 'my app';

  constructor (private apiService: ApiService, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

}
