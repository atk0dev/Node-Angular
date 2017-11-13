import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar>
      My App
      <button mat-button routerLink="/users">Users</button>
      <span style="flex: 1 1 auto"></span>
      <button mat-button routerLink="/register">Register</button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  title = 'my app';

  constructor (private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

}
