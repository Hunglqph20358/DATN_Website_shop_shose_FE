import { Component, OnInit } from '@angular/core';
import {UsersDTO} from '../model/UsersDTO';
import {CustomerInforService} from '../../service/customer-infor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  infoCustomer: UsersDTO = new UsersDTO();
  isOTPSent: boolean = false;
  constructor(private customerIFService: CustomerInforService, private router: Router) { }
  sendMailOTP(){
    localStorage.setItem('emailForgot', this.infoCustomer.email);
    const email: UsersDTO = {
      email: this.infoCustomer.email
    };
    this.customerIFService.sendMailOTP(email).subscribe( data => {
      console.log(data);
      this.isOTPSent = true;
    });
  }
  verifyOTP(){
    const otp: UsersDTO = {
      email: this.infoCustomer.email,
      otp: this.infoCustomer.otp
    };
    this.customerIFService.verifyOTP(otp).subscribe(data => {
      console.log(data.status);
      if (data.status === '200'){
        this.router.navigate(['/reset-pass']);
      }
    });
  }
  ngOnInit(): void {
  }

}
