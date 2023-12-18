import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthJwtService} from './auth-jwt.service';
import jwtDecode from 'jwt-decode';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthJwtService, public router: Router,
              private toastr: ToastrService) {
  }
  roles: string;
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const users = localStorage.getItem('users');
    this.roles = JSON.parse(users);
    if (!this.auth.isAuthenticated() || this.roles !== expectedRole) {
      this.toastr.error('Bạn không có quyền truy cập', 'Lỗi');
      return false;
    }
    return true;
  }
}
