import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {serviceAuth} from '../services/auth';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    ReactiveFormsModule,HttpClientModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})

export class Auth {
  AuthForm: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder, private serviceAuth: serviceAuth) {
    this.AuthForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  onSubmit() {
    console.log("Form submitted");
    if (this.AuthForm.valid) {
      console.log("Form is valid");
      const {
        email,
        password,
      } = this.AuthForm.value;

      this.serviceAuth.login(
        email,
        password,
      ).subscribe(
        (response : any) => {
          console.log('Signup successful:', response, response.data,email,password );
          this.submittedData = response.data;
          console.log(this.submittedData);
          localStorage.setItem('authToken',this.submittedData)

        },
        (error : any) => {
          console.error('Error during signup:', error);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }
}
