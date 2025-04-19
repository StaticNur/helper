import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Title} from '@angular/platform-browser';
import { Notify } from 'notiflix';
import {ILogin} from '../../../models/auth/login.model';
import {AuthService} from '../../../services/auth/auth.service';
import {LoadingComponent} from '../../../components/loading/loading.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgClass,
    LoadingComponent
  ]
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private title: Title)
  {

  }

  public isLoading: boolean = false;
  public showPassword: boolean = false;
  public loginPerson: ILogin = {
    'username': '',
    'password': ''
  };

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.loginUser(this.loginPerson).subscribe(
      () => {
        this.isLoading = false;
        Notify.success('Вы успешно Авторизовались');
        this.router.navigateByUrl("/main");
      },
      error => {
        if (error.status === 400) {
          Notify.failure('Проверьте корректность полей');
        } else if (error.status === 401) {
          Notify.failure('Неправильный пароль');
        } else if (error.status === 403) {
          Notify.failure('Пользователь заблокирован');
        } else if (error.status === 404) {
          Notify.failure('Пользователь не найден');
        } else {
          Notify.failure('Произошла неизвестная ошибка');
        }
        this.isLoading = false;
        console.error('Error logging in', error);
      }
    );
  }

  ngOnInit(): void {
    this.title.setTitle('Авторизация');
    if(this.authService.getToken() !== null){
      this.router.navigateByUrl("/main");
    }
  }
}
