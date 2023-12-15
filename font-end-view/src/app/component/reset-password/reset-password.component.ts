import { Component, OnInit } from '@angular/core';
import {UsersDTO} from '../model/UsersDTO';
import {CustomerInforService} from '../../service/customer-infor.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  infoCusotmer: UsersDTO = new UsersDTO();
  constructor(private service: CustomerInforService, private toasv: ToastrService, private router: Router) { }
  resetPass(){
    const newPass: UsersDTO = {
      email: localStorage.getItem('emailForgot'),
      newPass: this.infoCusotmer.newPass
    };
    this.service.resetPass(newPass).subscribe(data => {
      console.log(data);
      this.toasv.success("Mật khẩu đã được đặt lại, Mời bạn đăng nhập ", "Success");
      this.router.navigate(["/login"]);
    });
  }
  ngOnInit(): void {
  }

}
