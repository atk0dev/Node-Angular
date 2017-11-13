import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `
    <div *ngFor="let message of apiService.messages">
        <mat-card>{{ message.message }}</mat-card>
    </div>
  `
})
export class MessagesComponent implements OnInit {
  
  constructor (private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    this.apiService.getMessages(userId);
  }

}
