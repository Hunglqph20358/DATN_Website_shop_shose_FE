import { Component, OnInit } from '@angular/core';
import {UsersDTO} from '../model/UsersDTO';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {
  infoCustomer: UsersDTO;
  constructor() { }

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

}
