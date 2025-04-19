import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Notify } from 'notiflix';
import { HelpFormats, HelpTypes, IRegister } from '../../../models/auth/register.model';
import { AuthService } from '../../../services/auth/auth.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../components/loading/loading.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    NgClass,
    LoadingComponent,
    NgForOf
  ]
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(private router: Router, private authService: AuthService, private title: Title) {}

  showPassword: boolean = false;
  submitted = false;
  isLoading = false;

  registerPerson: IRegister = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    city: '',
    help_types: [],
    help_formats: []
  };

  public helpTypeOptions = [
    { value: HelpTypes.PSYCHO, label: 'Психологическая' },
    { value: HelpTypes.FINANCIAL, label: 'Финансовая' },
    { value: HelpTypes.VOLUNTEER, label: 'Волонтёрство' }
  ];

  public helpFormatOptions = [
    { value: HelpFormats.ONLINE, label: 'Онлайн' },
    { value: HelpFormats.OFFLINE, label: 'Оффлайн' }
  ];

  ngOnInit(): void {
    this.title.setTitle('Регистрация');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;

    // Проверка валидности формы
    if (!this.registerForm.form.valid || this.registerPerson.help_types.length === 0 || this.registerPerson.help_formats.length === 0) {
      Notify.failure('Заполните все обязательные поля');
      return;
    }

    this.isLoading = true;

    this.authService.registerUser(this.registerPerson).subscribe(
      response => {
        this.isLoading = false;
        this.submitted = false;
        Notify.success('Вы успешно зарегистрировались');
        this.router.navigateByUrl('/login');
      },
      error => {
        this.isLoading = false;
        this.submitted = false;

        if (error.status === 400) {
          Notify.failure('Проверьте корректность полей');
        } else {
          Notify.failure('Произошла неизвестная ошибка');
        }

        console.error('Error registering user', error);
      }
    );
  }

  onHelpTypeChange(event: Event, value: HelpTypes) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.registerPerson.help_types.push(value);
    } else {
      this.registerPerson.help_types = this.registerPerson.help_types.filter(item => item !== value);
    }
  }

  onHelpFormatChange(event: Event, value: HelpFormats) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.registerPerson.help_formats.push(value);
    } else {
      this.registerPerson.help_formats = this.registerPerson.help_formats.filter(item => item !== value);
    }
  }

  checkEmail() {
    if (!this.registerPerson.email) {
      return false;
    }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerPerson.email);
  }
}
