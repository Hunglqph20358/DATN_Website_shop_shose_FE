import {Component, OnInit} from '@angular/core';
import {GiaoHangService} from '../../service/giao-hang.service';
import {CartService} from '../../service/cart.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {OrderService} from '../../service/order.service';
import {PaymentService} from '../../service/payment.service';
import {MatDialog} from '@angular/material/dialog';
import {AddressCheckoutComponent} from './address-checkout/address-checkout.component';
import {PopupVoucherComponent} from './popup-voucher/popup-voucher.component';
import {AddressService} from '../../service/address.service';
import {VoucherService} from '../../service/voucher.service';
import {UtilService} from '../../util/util.service';

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
  checkChoicePay = 0;
  shipFee = 0;
  address: any;

  addressBuyNow: any = {
    provinceId: undefined,
    districtId: undefined,
    wardCode: undefined,
    specificAddress: undefined
  };

  totalMoneyPay;
  voucher: any;
  order: any = {
    customerDTO: {
      code: 'KH1699795301',
    },
    receiver: '',
    receiverPhone: '',
  };
  email;
  dataCheckoutByNow;

  listProvince = [];
  listDistrict = [];
  listWard = [];

  constructor(private giaoHangService: GiaoHangService, private cartService: CartService,
              private cookieService: CookieService, private route: Router, private orderService: OrderService,
              private paymentService: PaymentService, private matDialog: MatDialog,
              private addressService: AddressService, private voucherService: VoucherService, public utilService: UtilService
  ) {
    if (this.cookieService.check('checkout')) {
      const cartData = this.cookieService.get('checkout');
      const entries = JSON.parse(cartData);
      this.cartData = new Map(entries);
    }
    this.dataCheckoutByNow = JSON.parse(sessionStorage.getItem('dataCheckoutByNow'));
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
        this.totalSaveMoney += (res.data.productDTO.reducePrice * res.data.quantity);
        this.totalMoney += (res.data.productDTO.price * res.data.quantity) - (res.data.productDTO.reducePrice * res.data.quantity);
        this.totalMoneyPay = this.totalMoney;
      });
    });
    console.log(this.listCart);
    this.getAddress(3);
    this.giaoHangService.getAllProvince().subscribe(res => {
      this.listProvince = res.data;
    });
  }
  calculateTotal(price: number, quantity: number): string {
    const total = price * quantity;
    return this.utilService.formatMoney(total);
  }
  getDistrict(event) {
    this.giaoHangService.getAllDistrictByProvince(event.ProvinceID).subscribe(res => {
      this.listDistrict = res.data;
    });
  }

  getWard(event) {
    this.giaoHangService.getAllWardByDistrict(event.DistrictID).subscribe(res => {
      this.listWard = res.data;
    });
  }

  getAddress(id: number) {
    const obj = {
      idCustomer: id
    };
    this.addressService.getAddress(obj).subscribe(res => {
      this.address = res.data;
      const addressInfo = {
        service_type_id: 2,
        from_district_id: 3440,
        to_district_id: parseInt(res.data.districtId, 10),
        to_ward_code: res.data.wardCode,
        height: 20,
        length: 30,
        weight: 200,
        width: 40,
        insurance_value: 0,
      };
      this.giaoHangService.getTinhPhiShip(addressInfo).subscribe(res2 => {
        this.shipFee = res2.data.service_fee;
        this.totalMoneyPay = this.shipFee + this.totalMoneyPay;
      });
    });
  }

  getPhiShip() {
    const addressInfo = {
      service_type_id: 2,
      from_district_id: 3440,
      to_district_id: this.addressBuyNow.districtId,
      to_ward_code: this.addressBuyNow.wardCode,
      height: 20,
      length: 30,
      weight: 200,
      width: 40,
      insurance_value: 0,
    };
    this.giaoHangService.getTinhPhiShip(addressInfo).subscribe(res2 => {
      this.shipFee = res2.data.service_fee;
      this.totalMoneyPay = this.shipFee + this.totalMoneyPay;
    });
  }

  thanhToan() {
    if (this.checkChoicePay === 1) {
      if (this.dataCheckoutByNow === 1) {
        const obj = {
          ...this.order,
          totalPrice: this.totalMoney,
          totalPayment: this.totalMoneyPay,
          shipPrice: this.shipFee,
          codeVoucher: this.voucher ? this.voucher.code : null,
          addressReceived: this.addressBuyNow.specificAddress + ', ' + this.addressBuyNow.wards + ', '
            + this.addressBuyNow.district + ', ' + this.addressBuyNow.province,
          paymentType: 1,
          email: this.email
        };
        this.orderService.createOrderBuyNow(obj).subscribe(res => {
          if (res.status === 'OK') {
            const objCheckOut = {
              order: res.data,
              listCart: this.listCart,
            };
            sessionStorage.setItem('order', JSON.stringify(objCheckOut));
            this.paymentService.createPayment(this.totalMoneyPay).subscribe(resPay => {
              if (resPay.status === 'OK') {
                window.location.href = resPay.url;
              }
            });
          }
        });
      } else {
        const obj = {
          ...this.order,
          totalPrice: this.totalMoney,
          totalPayment: this.totalMoneyPay,
          shipPrice: this.shipFee,
          codeVoucher: this.voucher ? this.voucher.code : null,
          addressReceived: this.address.specificAddress + ', ' + this.address.wards + ', '
            + this.address.district + ', ' + this.address.province,
          paymentType: 1,
        };

        this.orderService.createOrder(obj).subscribe(res => {
          if (res.status === 'OK') {
            const objCheckOut = {
              order: res.data,
              listCart: this.listCart,
            };
            sessionStorage.setItem('order', JSON.stringify(objCheckOut));
            this.paymentService.createPayment(this.totalMoneyPay).subscribe(resPay => {
              if (resPay.status === 'OK') {
                window.location.href = resPay.url;
              }
            });
          }
        });
      }
    }
  }

  openPopupAddress() {
    this.matDialog.open(AddressCheckoutComponent, {
      width: '40%',
      height: '65vh',
      data: 3
    });
  }

  openVoucher() {
    this.matDialog.open(PopupVoucherComponent, {
      width: '45%',
      height: '70vh',
    }).afterClosed().subscribe(result => {
      if (result.event === 'saveVoucher') {
        this.voucherService.getVoucher(result.data.code).subscribe(res => {
          this.voucher = res.data;
          this.totalMoneyPay = this.totalMoneyPay - this.voucher.reducedValue;
          console.log(this.voucher);
        });
      }
    });
  }
}
