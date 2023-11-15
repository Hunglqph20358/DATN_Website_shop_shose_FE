import { Component, OnInit } from '@angular/core';
import {SignInService} from '../../service/authentication/sign-in.service';
import {Router} from '@angular/router';
import {SignUpRepquest} from '../model/SignUpRepquest';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: any = {
    fullname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    birthday: '',
    gender: '',
    role: ''
  };
  signUpForm: SignUpRepquest;
  constructor(private signup: SignInService, private router: Router) { }
  signUp() {
    this.signUpForm = new SignUpRepquest (
      this.form.fullname,
      this.form.username,
      this.form.password,
      this.form.email,
      this.form.phone,
      this.form.birthday,
      this.form.gender,
      this.form.role,
    );
    console.log(this.signUpForm);
    this.signup.signUp(this.signUpForm).subscribe(data =>{
      console.log(data);
      if (data.message === 'Create Success'){
        alert('Đăng kí thành công ! ');
        this.router.navigate(['login']);
      }
    });
  }
  ngOnInit(): void {
  }

}
