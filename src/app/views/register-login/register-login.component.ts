import { Component, OnInit } from '@angular/core';
import {AuthenticationService } from '../../services/AuthenticationService.service';
import { User } from '../../models/User';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.scss']
})
export class RegisterLoginComponent implements OnInit {
  currentUser: User;
  
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit() {
    
  }

  logout()  {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
