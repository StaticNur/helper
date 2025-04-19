import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from './constant';
import {IUser} from '../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  private baseUrl = BASE_URL;

  public getMe(): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + '/users/api/me/');
  }
}
