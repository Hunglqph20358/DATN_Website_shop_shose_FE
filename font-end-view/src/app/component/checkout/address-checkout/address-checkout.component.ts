import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UpdateAddressComponent} from './update-address/update-address.component';
import {AddressService} from '../../../service/address.service';

@Component({
  selector: 'app-address-checkout',
  templateUrl: './address-checkout.component.html',
  styleUrls: ['./address-checkout.component.css']
})
export class AddressCheckoutComponent implements OnInit {

  listAddress: any = [];
  idAddress: any;
  constructor(private dialog: MatDialog, private addressService: AddressService, private cdr: ChangeDetectorRef,
              public matDialogRef: MatDialogRef<AddressCheckoutComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.idAddress = this.data;
    const obj = {
      id_customer: 3
    };
    this.addressService.getAllAddress(obj).subscribe(res => {
      this.listAddress = res;
    });
  }

  openPopup() {
    this.dialog.open(UpdateAddressComponent, {
      width: '40%',
      height: '65vh'
    }).afterClosed().subscribe(result => {
      if (result === 'saveAddress') {
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }

  openPopupUpdate() {
    this.dialog.open(UpdateAddressComponent, {
      width: '40%',
      height: '65vh'
    });
  }

  xacNhan() {

  }
}
