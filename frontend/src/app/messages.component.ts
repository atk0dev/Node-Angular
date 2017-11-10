import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'messages',
  template: `
    <div *ngFor="let message of apiService.messages">
        <mat-card>{{ message.message }}</mat-card>
    </div>
  `
})
export class MessagesComponent implements OnInit {
  
  constructor (private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getMessages();
  }

}