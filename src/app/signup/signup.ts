import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {serviceAuth} from '../services/auth';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  SignForm: FormGroup;
  submittedData: any = null;

  constructor(private fb: FormBuilder, private auth: serviceAuth) {
    this.SignForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
      pseudo: ['', [Validators.required]],
      cityCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^0[1-9]\d{8}$/)]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('passwordConfirm')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    console.log("Form submitted");
    if (this.SignForm.valid) {
      console.log("Form is valid");
      const {
        email,
        password,
        passwordConfirm,
        pseudo,
        cityCode,
        city,
        phone
      } = this.SignForm.value;

      this.auth.signup(
        email,
        password,
        passwordConfirm,
        pseudo,
        cityCode,
        city,
        phone
      ).subscribe(
        (response: any ) => {
          console.log('Signup successful:', response);
          this.submittedData = response;
        },
        (error: any) => {
          console.error('Error during signup:', error);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }
}
