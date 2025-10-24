import { Component } from '@angular/core';
import {serviceAuth} from '../services/auth';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home {
  constructor(private authService: serviceAuth) {
  }
  public authenticated: boolean = false;

  public testAuth() {
    console.log(this.authService.check().subscribe());
    if (this.authService.check()) {
      console.log("User is authenticated");
      this.authenticated = true;
    } else {
      console.log("User is not authenticated");
    }
  }

  ngOnInit(): void {
    this.testAuth();
  }
}
