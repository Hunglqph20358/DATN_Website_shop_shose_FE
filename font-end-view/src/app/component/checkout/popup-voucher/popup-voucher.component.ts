import {Component, OnInit} from '@angular/core';
import {VoucherService} from '../../../service/voucher.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-voucher',
  templateUrl: './popup-voucher.component.html',
  styleUrls: ['./popup-voucher.component.css']
})
export class PopupVoucherComponent implements OnInit {

  listVoucher: any = [];
  voucherChoice: string = null;

  constructor(private voucherService: VoucherService, public matDialogRef: MatDialogRef<PopupVoucherComponent>) {
  }

  ngOnInit(): void {
    this.voucherService.getAllVoucher().subscribe(res => {
      this.listVoucher = res;
    });
  }

  xacNhan() {
    console.log(this.voucherChoice);
    this.matDialogRef.close({event: 'saveVoucher', data: {code: this.voucherChoice}});
  }
}
