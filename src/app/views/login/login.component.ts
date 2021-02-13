import { Component, OnInit } from '@angular/core';  
import { GoogleLoginProvider, FacebookLoginProvider, AuthService, SocialUser } from 'angularx-social-login';  
import { User } from '../../models/User'  
import { AuthenticationService } from '../../services/AuthenticationService.service';  
import { Router, ActivatedRoute, Params } from '@angular/router';  
import { first,map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html',  
  styleUrls: ['./login.component.scss']  
})  

export class LoginComponent implements OnInit {  
    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    username: string;
    password: string;
    showSpinner: boolean;

    constructor(  
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,  
      private router: Router,
      private route: ActivatedRoute,
      private alertService: AlertService
  ) {
      
    if(this.authenticationService.currentUserValue)
      {
        this.router.navigate(['/']);
      }
   }  

  ngOnInit() {  
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }  

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.alertService.clear();
    if(this.loginForm.invalid) {
      return;
    }

    this.submitted = true;
    this.showSpinner = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.showSpinner = false;
          },
          error => {
            this.alertService.error(error.error.error_description);
            this.showSpinner = false;
          }
      )
  } 
}