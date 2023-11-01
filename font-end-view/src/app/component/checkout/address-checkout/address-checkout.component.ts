import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UpdateAddressComponent} from './update-address/update-address.component';

@Component({
  selector: 'app-address-checkout',
  templateUrl: './address-checkout.component.html',
  styleUrls: ['./address-checkout.component.css']
})
export class AddressCheckoutComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openPopup() {
    this.dialog.open(UpdateAddressComponent, {
      width: '40%',
      height: '65vh'
    });
  }

  openPopupUpdate() {
    this.dialog.open(UpdateAddressComponent, {
      width: '40%',
      height: '65vh'
    });
  }
}
