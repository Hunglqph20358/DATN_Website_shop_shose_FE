import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  constructor(public jwtHelper: JwtHelperService) { }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
