import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {TokenService} from '../../service/token.service';
import {SignForm} from '../model/SignForm';
import {AuthJwtService} from '../../service/auth-jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = 'Dang nhap that bai';
  form: any = {
    username: '',
    password: ''
  };
  signFrom: SignForm;
  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService, private jwt: AuthJwtService) { }
  login() {
    this.signFrom = new SignForm(
      this.form.username,
      this.form.password
    );
    console.log(this.signFrom);
    this.authService.signIn(this.signFrom).subscribe(data =>{
      if (!data.token){
        alert('Lỗi đăng nhập');
      }else {
        localStorage.setItem('token', data.token);
        this.router.navigate(['']);
      }
    });
  }
  ngOnInit(): void {
  }

}
