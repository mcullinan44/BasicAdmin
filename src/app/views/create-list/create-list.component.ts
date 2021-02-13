import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/AuthenticationService.service';
import {AlertService} from '../../services/alert.service';
import {ApiService} from '../../services/api.service';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {
  newListForm: FormGroup
  loading = false;
  submitted = false;

  Name: string;
  Description: string;

  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.newListForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.newListForm.invalid) {
        return;
    }
    this.loading = true;

  }
}
