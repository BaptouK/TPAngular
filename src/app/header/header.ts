import {Component, OnInit} from '@angular/core';
import {serviceAuth} from '../services/auth';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {provideRouter, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private auth: serviceAuth, private router: Router) {
    this.isAuthenticated$ = this.auth.isAuthenticated$;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }
}
