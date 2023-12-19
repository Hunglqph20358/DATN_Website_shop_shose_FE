import { Component, OnInit } from '@angular/core';
import {UsersDTO} from '../model/UsersDTO';
import {CustomerServiceService} from '../../service/customer-service.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: any = {
    fullname: '',
    birthday: '',
    phone: '',
    gender: ''
  };

  constructor(private customerService: CustomerServiceService ,private dialogRef: MatDialogRef<CustomerComponent>, private toastr: ToastrService) { }
  addCustomerSC(){
    this.customerService.addCustomerSC(this.customer).subscribe(data => {
      console.log(data);
      this.toastr.success('Thêm thành công', 'Thông báo');
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
