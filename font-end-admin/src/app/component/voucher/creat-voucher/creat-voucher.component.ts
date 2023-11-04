import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-creat-voucher',
  templateUrl: './creat-voucher.component.html',
  styleUrls: ['./creat-voucher.component.css'],
})
export class CreatVoucherComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    voucherType: '',
    conditionApply: '',
    quantity: '',
  };
  constructor(private voucherService: VoucherService,
              private  router: Router) {}
  ngOnInit(): void {}
  addVoucher() {
    const obj = {
      ...this.voucher,
    };
    this.voucherService.createVoucher(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        console.log('Discount added successfully', response);
        this.router.navigateByUrl('/admin/voucher');
      },
      (error) => {
        // Handle errors if the discount creation fails
        console.error('Error adding discount', error);
      }
    );
  }
}
