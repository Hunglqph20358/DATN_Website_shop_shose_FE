import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VoucherService} from "../../../service/voucher.service";

@Component({
  selector: 'app-edit-voucher-ship',
  templateUrl: './edit-voucher-ship.component.html',
  styleUrls: ['./edit-voucher-ship.component.css']
})
export class EditVoucherShipComponent implements OnInit {

  isHidden: boolean = true;
  voucher: any = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    voucherType: '',
    conditions: '',
    quantity: '',
  };
  constructor(private activatedRoute: ActivatedRoute,
              private service: VoucherService,
              private rou: Router) {}
  ngOnInit(): void {
    this.isHidden = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.service.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = response[0];
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditions = firstElement.conditions;
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
  editVoucher(){
    this.service
      .updateVoucher(this.voucher.id, this.voucher)
      .subscribe(() => {
        this.rou.navigateByUrl('/admin/voucher');
      });
  }
}
