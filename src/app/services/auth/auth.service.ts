import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IAuthUser} from '../../models/auth/auth-user.model';
import {ILogin} from '../../models/auth/login.model';
import {IRegister} from '../../models/auth/register.model';
import {BASE_URL} from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  private baseUrl = BASE_URL;
  private token: string = 'token';
  private currentUser: string = 'currentUser';

  loginUser(user: ILogin): Observable<IAuthUser> {
    return this.http.post<IAuthUser>(this.baseUrl + '/users/api/login/', user)
      .pipe(
        tap((authUser: IAuthUser) => {
          this.setToken(authUser.token);
        })
      );
  }

  registerUser(user: IRegister) {
    return this.http.post<IRegister>(this.baseUrl + '/users/api/reg/', user);
  }

  logoutUser(): void {
    this.clearToken();
    this.clearCurrentUser();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.token, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.token);
  }

  private clearCurrentUser(): void {
    localStorage.removeItem(this.currentUser);
  }
}
