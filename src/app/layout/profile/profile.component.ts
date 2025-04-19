import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth/auth.service';
import {HelpFormats, HelpTypes, IRegister} from '../../models/auth/register.model';
import {Notify} from 'notiflix';
import {LoadingComponent} from '../../components/loading/loading.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    LoadingComponent,
    NgForOf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit {
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

  public ngOnInit(): void {
    this.isLoading = true;

    this.userService.getMe().subscribe(
      (user: IRegister) => {
        this.user = user;
        this.isLoading = false;
      },
      error => {
        this.handleError(error);
        this.isLoading = false;

      }
    );
  }

  public goBack(): void {
    this.router.navigate(['/main']);
  }

  public getHelpTypeLabel(type: HelpTypes): string {
    switch (type) {
      case HelpTypes.PSYCHO:
        return 'Психологическая помощь';
      case HelpTypes.FINANCIAL:
        return 'Финансовая помощь';
      case HelpTypes.VOLUNTEER:
        return 'Волонтерство';
      default:
        return 'Неизвестный тип';
    }
  }

  public getHelpFormatLabel(format: HelpFormats): string {
    switch (format) {
      case HelpFormats.ONLINE:
        return 'Онлайн';
      case HelpFormats.OFFLINE:
        return 'Офлайн';
      default:
        return 'Неизвестный формат';
    }
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
