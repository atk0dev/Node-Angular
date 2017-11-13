import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css'],
})
export class PostComponent implements OnInit {
    
    postMessage = '';

  constructor (private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  post() {
    this.apiService.postMessage({message: this.postMessage});
  }

}
