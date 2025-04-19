import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {RegisterComponent} from './layout/auth/register/register.component';
import {LoginComponent} from './layout/auth/login/login.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegisterComponent, LoginComponent, NgIf],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Helper.Client';
  showLogin: boolean = false;
  showRegistration: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showLogin = (event.url === '/' || event.url === '/login');
        this.showRegistration = (event.url === '/register');
      }
    });
  }
}
