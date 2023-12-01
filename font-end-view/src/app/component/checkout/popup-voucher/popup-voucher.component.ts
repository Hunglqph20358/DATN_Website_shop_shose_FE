import {Component, Inject, OnInit} from '@angular/core';
import {VoucherService} from '../../../service/voucher.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-popup-voucher',
  templateUrl: './popup-voucher.component.html',
  styleUrls: ['./popup-voucher.component.css']
})
export class PopupVoucherComponent implements OnInit {

  listVoucher: any = [];
  voucherChoice: string = null;

  constructor(private voucherService: VoucherService, public matDialogRef: MatDialogRef<PopupVoucherComponent>,
              private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.voucherService.getAllVoucher().subscribe(res => {
      this.listVoucher = res;
    });
  }

  xacNhan() {
    console.log(this.voucherChoice);
    this.toastr.success('Áp dụng Voucher thành công', 'Thông báo');
    this.matDialogRef.close({event: 'saveVoucher', data: {code: this.voucherChoice}});
  }

  closePopup() {
    this.matDialogRef.close('close-voucher');
  }
}
