import { Component } from '@angular/core';
import {serviceAuth} from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private auth: serviceAuth) {
  }

  public authenticated: boolean = false;

  public testAuth() {
    console.log(this.auth.check().subscribe());
    if (this.auth.check()) {
      console.log("User is authenticated");
      this.authenticated = true;
    } else {
      console.log("User is not authenticated");
    }
  }

  init() {
    console.log("Header initialized");
    this.auth.check().subscribe(
      (response: any) => {
        console.log('User is authenticated:', response);
      },
      (error: any) => {
        console.error('User is not authenticated:', error);
      }
    );
  }

  ngOnInit(): void {


  }
}
