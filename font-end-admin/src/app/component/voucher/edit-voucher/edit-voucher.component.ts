import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from "../../../service/voucher.service";

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css'],
})
export class EditVoucherComponent implements OnInit {
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
      const idParam = params['id'];
      console.log(idParam);
      this.service.getDetailVoucher(idParam).subscribe((response: any[]) => {
        const firstElement = response[0];
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditions = firstElement.conditions;
        this.voucher.discountType = firstElement.discountType;
        this.voucher.endDate = firstElement.endDate;
        this.voucher.quantity = firstElement.quantity;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = firstElement.startDate;
        console.log(this.voucher);
      });
    });
  }
  editVoucher(){
    this.service
      .updateVoucher(this.voucher.id, this.voucher)
      .subscribe(() => {
        this.rou.navigateByUrl('/admin/voucher');
      });
  }
}
