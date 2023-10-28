import {Component, OnInit} from '@angular/core';
import {GiaoHangService} from '../../service/giao-hang.service';
import {CartService} from '../../service/cart.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  listCart = [];
  cartData = new Map();
  totalMoney: any;
  totalSaveMoney: any;

  listProvince = [];
  listDistrict = [];
  listWard = [];
  checkChoicePay = 0;
  shipFee;
  addressInfo = {
    service_type_id: 2,
    from_district_id: 3440,
    to_district_id: null,
    to_ward_code: '',
    height: 20,
    length: 30,
    weight: 200,
    width: 40,
    insurance_value: 0,
  };
  totalMoneyPay;
  constructor(private giaoHangService: GiaoHangService, private cartService: CartService,
              private cookieService: CookieService, private route: Router, ) {
    if (this.cookieService.check('cart')) {
      const cartData = this.cookieService.get('cart');
      const entries = JSON.parse(cartData);
      this.cartData = new Map(entries);
    }
    // @ts-ignore
    window.scrollTo(top, 0, 0);
  }

  ngOnInit(): void {
    this.totalMoney = 0;
    this.totalSaveMoney = 0;
    this.cartData.forEach((value, key) => {
      const idKey = key.split('-');
      this.cartService.getCart(idKey[0], idKey[1], idKey[2], value).subscribe(res => {
        this.listCart.push(res.data);
        this.totalSaveMoney += (res.data.productDetailDTO.listedPrice * res.data.quantity) - (res.data.productDetailDTO.price * res.data.quantity);
        this.totalMoney += res.data.productDetailDTO.price * res.data.quantity;
      });
    });
    this.giaoHangService.getAllProvince().subscribe(res => {
      this.listProvince = res.data;
    });
    this.totalMoneyPay = this.totalMoney;
  }

  getDistrict(event) {
    console.log(event);
    this.giaoHangService.getAllDistrictByProvince(event.ProvinceID).subscribe(res => {
      this.listDistrict = res.data;
    });
  }

  getWard(event) {
    console.log(event);
    console.log(this.addressInfo.to_district_id);
    this.giaoHangService.getAllWardByDistrict(event.DistrictID).subscribe(res => {
      this.listWard = res.data;
    });
  }

  getPhiShip(){
    const obj = this.addressInfo;
    this.giaoHangService.getTinhPhiShip(obj).subscribe(res => {
      this.shipFee = res.data.service_fee;
      this.totalMoneyPay = this.shipFee + this.totalMoneyPay;
    });
  }

}
