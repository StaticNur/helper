import {provideRouter, Routes} from '@angular/router';
import {LoginComponent} from './layout/auth/login/login.component';
import {RegisterComponent} from './layout/auth/register/register.component';
import {MainPageComponent} from './layout/main-page/main-page.component';
import {RequestsComponent} from './layout/main-page/requests/requests.component';
import {ChatsComponent} from './layout/main-page/chats/chats.component';
import {OrganizationsComponent} from './layout/main-page/organizations/organizations.component';
import {VolunteersComponent} from './layout/main-page/volunteers/volunteers.component';
import {ProfileComponent} from './layout/profile/profile.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      { path: 'requests', component: RequestsComponent },
      { path: 'chats', component: ChatsComponent },
      { path: 'organizations', component: OrganizationsComponent },
      { path: 'volunteers', component: VolunteersComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const appRoutingProviders = [provideRouter(routes)];
