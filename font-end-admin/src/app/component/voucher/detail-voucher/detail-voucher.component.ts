import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VoucherService} from "../../../service/voucher.service";

@Component({
  selector: 'app-detail-voucher',
  templateUrl: './detail-voucher.component.html',
  styleUrls: ['./detail-voucher.component.css']
})
export class DetailVoucherComponent implements OnInit {
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    voucherType: '',
    conditions: '',
    quantity: '',
  };
  constructor(private  activatedRoute: ActivatedRoute,
              private voucherService: VoucherService) { }

  ngOnInit(): void {
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.voucherService
        .getDetailVoucher(id)
        .subscribe((respons) => {
          this.voucher = respons;
        });
    });
    console.log(this.voucher);
  }

}
