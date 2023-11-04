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
    conditionApply: '',
    quantity: '',
  };
  constructor(private  activatedRoute: ActivatedRoute,
              private voucherService: VoucherService) { }

  ngOnInit(): void {
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.voucherService.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = response[0];
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditionApply = firstElement.conditionApply;
        this.voucher.voucherType = firstElement.voucherType;
        this.voucher.endDate = firstElement.endDate;
        this.voucher.quantity = firstElement.quantity;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = firstElement.startDate;
        console.log(this.voucher);
      });
    });
    console.log(this.voucher);
  }

}
