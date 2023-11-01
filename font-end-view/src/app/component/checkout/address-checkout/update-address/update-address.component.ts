import {Component, OnInit} from '@angular/core';
import {GiaoHangService} from '../../../../service/giao-hang.service';
import {MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../service/address.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent implements OnInit {
  listProvince = [];
  listDistrict = [];
  listWard = [];

  address: any = {
    provinceId: undefined,
    districtId: undefined,
    wardCode: undefined,
    specificAddress: undefined
  };

  constructor(private giaoHangService: GiaoHangService, public matRef: MatDialogRef<UpdateAddressComponent>,
              private addressService: AddressService) {
  }

  ngOnInit(): void {
    this.giaoHangService.getAllProvince().subscribe(res => {
      this.listProvince = res.data;
    });
  }

  getDistrict(event) {
    console.log(event);
    this.giaoHangService.getAllDistrictByProvince(event.ProvinceID).subscribe(res => {
      this.listDistrict = res.data;
    });
  }

  getWard(event) {
    this.giaoHangService.getAllWardByDistrict(event.DistrictID).subscribe(res => {
      this.listWard = res.data;
    });
  }

  add() {
    console.log(this.address);
    debugger
    let province = this.listProvince.find(c => c.ProvinceID === this.address.provinceId);
    console.log(province);
    let district = this.listDistrict.find(d => d.DistrictID === this.address.districtId);
    debugger
    let ward = this.listWard.find(w => w.WardCode === this.address.wardCode);
    const obj = {
      ...this.address,
      idCustomer: 3,
      province: province.ProvinceName,
      district: district.DistrictName,
      wards: ward.WardName
    };
    this.addressService.createAddress(obj).subscribe(res => {
      console.log(res.data);
      this.matRef.close('save-address');
    });
  }
}
