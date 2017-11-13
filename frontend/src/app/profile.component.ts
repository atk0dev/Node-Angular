import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile',
  template: `
    <mat-card>
    <mat-card-header>
        <mat-card-title>
            <h4>Profile</h4>
        </mat-card-title>
    </mat-card-header>
    <mat-card-content>
        <mat-list>
            <mat-list-item>Name: {{ profile?.name }}</mat-list-item>
            <mat-list-item>Email: {{ profile?.email }}</mat-list-item>
            <mat-list-item>Description: {{ profile?.description }}</mat-list-item>
        </mat-list>
    </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['register.component.css'],
})
export class ProfileComponent implements OnInit {

    profile: any;

  constructor (private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      const userId = this.route.snapshot.params.id;
      this.apiService.getProfile(userId).subscribe(data => {
          this.profile = data.json();
      });
  }


}
