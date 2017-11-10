import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'users',
  template: `
    <div *ngFor="let user of apiService.users">
        <mat-card [routerLink]="['/profile', user._id]" style="cursor: pointer">{{ user.email }}</mat-card>
    </div>
  `
})
export class UsersComponent implements OnInit {
  
  constructor (private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getUsers();
  }

}
