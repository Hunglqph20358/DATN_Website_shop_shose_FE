import { Component, OnInit } from '@angular/core';
import {SignInFrom} from '../model/SignInFrom';
import {AuthService} from '../../service/authentication/auth.service';
import {Router} from '@angular/router';
import {AuthJwtService} from '../../service/authentication/auth-jwt.service';
import {SignInService} from '../../service/authentication/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: '',
    password: ''
  };
  signFrom: SignInFrom;
  constructor(private signIn: SignInService, private router: Router, private jwt: AuthJwtService) { }
  login() {
    this.signFrom = new SignInFrom(
      this.form.username,
      this.form.password
    );
    console.log(this.signFrom);
    this.signIn.signIn(this.signFrom).subscribe(data =>{
        localStorage.setItem('token', data.token);
        console.log(data.usersDTO);
        localStorage.setItem('users', JSON.stringify(data.usersDTO));
        this.router.navigate(['shopping-cart']);
    },
      // this.signIn.loadInFor().
      error => {
        if (error.status === 403){
          alert('Mật kHẩu không chính xác');
        }else if (error.status === 401){
          alert('Không tìm thấy user');
        }
      }
    );
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
  ngOnInit(): void {
  }

}
