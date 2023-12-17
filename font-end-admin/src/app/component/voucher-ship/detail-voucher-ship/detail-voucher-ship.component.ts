import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VoucherService} from "../../../service/voucher.service";
import {VoucherShipService} from "../../../service/voucher-ship.service";

@Component({
  selector: 'app-detail-voucher-ship',
  templateUrl: './detail-voucher-ship.component.html',
  styleUrls: ['./detail-voucher-ship.component.css']
})
export class DetailVoucherShipComponent implements OnInit {

  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    conditions: '',
    quantity: '',
    createDate: '',
    customerAdminDTOList: '',
    limitCustomer: '',
    optionCustomer: '',
    createName: localStorage.getItem('fullname'),
  };
  constructor(private  activatedRoute: ActivatedRoute,
              private voucherService: VoucherShipService) { }

  ngOnInit(): void {
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      console.log(id);
      this.voucherService.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = Array.isArray(response) ? response[0] : response;
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditions = firstElement.conditions;
        this.voucher.endDate = firstElement.endDate;
        this.voucher.quantity = firstElement.quantity;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = firstElement.startDate;
        this.voucher.createDate = firstElement.createDate;
        this.voucher.limitCustomer = firstElement.limitCustomer;
        this.voucher.customerAdminDTOList = firstElement.customerAdminDTOList;
        console.log(this.voucher);
      });
    });
  }
}
