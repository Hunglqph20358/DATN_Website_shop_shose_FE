import { Component, OnInit } from '@angular/core';
import {UsersDTO} from '../model/UsersDTO';
import {CustomerInforService} from '../../service/customer-infor.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  infoCustomer: UsersDTO;
  rePass: string;
  constructor(private customerInforService: CustomerInforService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.loadUserInfo();
  }
  private loadUserInfo(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.infoCustomer = JSON.parse(storedUsers);
      this.formatBirthday();
    }
  }

  private formatBirthday(): void {
    if (this.infoCustomer && this.infoCustomer.birthday) {
      const dateObject = new Date(this.infoCustomer.birthday);
      const formattedDate = this.formatDate(dateObject);
      this.infoCustomer.birthday = formattedDate;
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  updateInfor(){
    this.customerInforService.updateInfor(this.infoCustomer).subscribe(
      data => {
        console.log(data);
        console.log(this.infoCustomer);
        localStorage.removeItem('users');
        localStorage.setItem('users', JSON.stringify(this.infoCustomer));
        this.loadUserInfo();
        const toastrRef = this.toastr.success('Cập nhật thành công!', 'Success', { timeOut: 1000});
        setTimeout(() => {
          this.handleReload();
        }, 1000);
      },
      error => {
        console.error(error);
        this.toastr.error('Đã xảy ra lỗi khi cập nhật thông tin!', 'Error');
      }
    );
  }
  handleReload() {
    this.router.navigate(['/user-profile']).then(() => {
      location.reload();
    });
  }
  changePass(){
    this.customerInforService.changePass(this.infoCustomer).subscribe(
      data => {
        console.log(data);
        this.toastr.success('Cập nhật thành công! ', 'Success');
        this.rePass = '';
        this.ngOnInit();
      },
      error => {
        console.error(error);
        this.toastr.error('Đã xảy ra lỗi khi cập nhật thông tin!', 'Error');
      }
    );
  }
}
