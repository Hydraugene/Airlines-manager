import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class Erreur401Interceptor implements HttpInterceptor {
  constructor(private userService:UserService, public authService:AuthService) {}

  /** Intercepter les rêquetes entrantes pour vérifier une erreur 401 d'authentification */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      erreur => {
        if (erreur instanceof HttpErrorResponse && erreur.status == 401) {
          this.authService.signOut();
        }
        return erreur;
      }
    );
  }
}
