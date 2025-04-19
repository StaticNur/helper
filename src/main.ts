import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {ApplicationConfig} from '@angular/core';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './app/auth.interceptor';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
