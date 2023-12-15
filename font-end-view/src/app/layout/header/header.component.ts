import {Component, OnInit} from '@angular/core';
import {apiURL} from '../../config/apiURL';
import {UsersDTO} from '../../component/model/UsersDTO';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  infoCustomer: UsersDTO;
  size: number;
  constructor() {
  }

  api = apiURL;

  updateInFor(infor: UsersDTO){

  }

  ngOnInit(): void {
    this.infoCustomer = JSON.parse(localStorage.getItem('users'));
    this.size = localStorage.getItem('users').length;
  }
  isHideLogin(): boolean {
    if (this.size > 0){
      return true;
    }
    return false;
  }
  logOut(){
    localStorage.removeItem('token ');
    localStorage.removeItem('users');
  }
}
