import {Component, OnInit} from '@angular/core';
import {LoadingComponent} from '../../components/loading/loading.component';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Notify} from 'notiflix';
import {AuthService} from '../../services/auth/auth.service';
import {IRegister} from '../../models/auth/register.model';
import {UserService} from '../../services/user.service';
import {HeaderComponent} from '../../components/header/header.component';

@Component({
  selector: 'app-main-page',
  imports: [
    LoadingComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  constructor(
    public router: Router,
    private userService: UserService,
    public authService: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current route:', event.url);
      }
    });
  }

  public isLoading: boolean = true;
  public user: IRegister;

  ngOnInit(): void {
    this.isLoading = false;

    /*this.userService.getMe().subscribe(
      (user: IRegister) => {
        this.user = user;
        this.isLoading = false;
      },
      error => {
        this.handleError(error);
        this.isLoading = false;

      }
    );*/
  }

  private handleError(error: any) {
    if (error.status === 400) {
      Notify.failure('Проверьте корректность полей');
    } else if (error.status === 401) {
      Notify.failure('Срок действия токена истёк');
      this.authService.logoutUser();
      this.router.navigateByUrl("/login");
    } else if (error.status === 403) {
      Notify.failure('Пользователь заблокирован');
    } else if (error.status === 404) {
      Notify.failure('Пользователь не найден');
    } else {
      Notify.failure('Произошла неизвестная ошибка');
    }
    this.authService.logoutUser();
    this.router.navigateByUrl("/login");
    console.error('Error logging in', error);
  }
}
