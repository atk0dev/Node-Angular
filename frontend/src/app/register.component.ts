import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})
export class RegisterComponent implements OnInit {

    registerData = {};

  constructor (private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  post() {
      //console.log(this.registerData);
      this.authService.registerUser(this.registerData);
  }

}
