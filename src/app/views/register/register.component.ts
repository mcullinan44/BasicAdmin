import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/AuthenticationService.service';
import {AlertService} from '../../services/alert.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    
    email: string;
    password: string;
    confirmPassword: string;
    showSpinner: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        }, { 
            validators: [
                this.passwordsMatch('password', 'confirmPassword')
        ]}
        )
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }
    
    passwordsMatch(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
          if (!control) { return null; }
          const password = control.get(passwordKey);
          const confirmPassword = control.get(confirmPasswordKey);
          if (!password.value || !confirmPassword.value) {
            return null;
          }
          if (password.value !== confirmPassword.value) {
            this.alertService.error("Password don't match")
            
            return { passwordMismatch: true };
          }
        };
      }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .subscribe((data) => {
                this.router.navigate(['/login']);
            }, error => {
                this.alertService.error(error.error.ModelState[""][0]);
                this.loading = false;
            });
    }
}