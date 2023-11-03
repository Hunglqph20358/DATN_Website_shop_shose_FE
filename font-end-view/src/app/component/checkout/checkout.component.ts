import {Component, OnInit} from '@angular/core';
import {GiaoHangService} from '../../service/giao-hang.service';
import {CartService} from '../../service/cart.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {PaymentService} from '../../service/payment.service';
import {MatDialog} from '@angular/material/dialog';
import {AddressCheckoutComponent} from './address-checkout/address-checkout.component';

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
  shipFee = 0;
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

  order: any = {
    customerDTO: {
      code: 'KH1698454230',
    },
    receiver: '',
    receiverPhone: '',
    totalPrice: 0.0,
    shipPrice: 0.0
  };


  // orderDetail: {
  //   idOrder: '',
  //   lstProductDetail: [];
  //   quantity: 0,
  //   price: 0.0
  // };

  constructor(private giaoHangService: GiaoHangService, private cartService: CartService,
              private cookieService: CookieService, private route: Router, private orderService: OrderService,
              private paymentService: PaymentService, private matDialog: MatDialog) {
    if (this.cookieService.check('checkout')) {
      const cartData = this.cookieService.get('checkout');
      const entries = JSON.parse(cartData);
      this.cartData = new Map(entries);
    }
    // @ts-ignore
    window.scrollTo(top, 0, 0);
  }

  ngOnInit(): void {
    this.totalMoney = 0;
    this.totalSaveMoney = 0;
    this.totalMoneyPay = 0;
    this.cartData.forEach((value, key) => {
      const idKey = key.split('-');
      this.cartService.getCart(idKey[0], idKey[1], idKey[2], value).subscribe(res => {
        this.listCart.push(res.data);
        // tslint:disable-next-line:max-line-length
        this.totalSaveMoney += (res.data.productDetailDTO.listedPrice * res.data.quantity) - (res.data.productDetailDTO.price * res.data.quantity);
        this.totalMoney += res.data.productDetailDTO.price * res.data.quantity;
        this.totalMoneyPay = this.totalMoney;
      });
    });
    console.log(this.listCart);
    this.giaoHangService.getAllProvince().subscribe(res => {
      this.listProvince = res.data;
    });

  }


  getWard(event) {
    console.log(event);
    console.log(this.addressInfo.to_district_id);
    this.giaoHangService.getAllWardByDistrict(event.DistrictID).subscribe(res => {
      this.listWard = res.data;
    });
  }

  getPhiShip() {
    const obj = this.addressInfo;
    this.giaoHangService.getTinhPhiShip(obj).subscribe(res => {
      this.shipFee = res.data.service_fee;
      this.totalMoneyPay = this.shipFee + this.totalMoneyPay;
    });
  }

  thanhToan() {
    if (this.checkChoicePay === 1) {
      const obj = {
        ...this.order,
        paymentType: 1,
      };
      this.orderService.createOrder(obj).subscribe(res => {
        if (res.status === 'OK') {
          this.paymentService.createPayment(this.totalMoneyPay).subscribe(resPay => {
            if (resPay.status === 'OK') {
              window.location.href = resPay.url;
            }
          });
        }
      });
    }
  }

  openPopupAddress(){
    this.matDialog.open(AddressCheckoutComponent, {
      width: '40%',
      height: '65vh'
    });
  }
}
