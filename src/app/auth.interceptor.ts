import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from './services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Token ${token}`),
    });
    return next(clonedRequest);
  } else {
    return next(req);
  }
};
