import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  entetes:any;

  constructor(private userService:UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.userService.token){
      this.entetes = {
        headers : new HttpHeaders(
          {'Authorization': 'Bearer ' + this.userService.token}
        )
      };
      const httpToken = request.clone(this.entetes)
      return next.handle(httpToken);
    };

    return next.handle(request);
  }
}
