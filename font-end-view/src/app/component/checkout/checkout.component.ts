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

  addressNotLogin: any = {
    provinceId: undefined,
    districtId: undefined,
    wardCode: undefined,
    specificAddress: undefined
  };

  totalMoneyPay;
  voucher: any;
  order: any = {
    receiver: '',
    receiverPhone: '',
  };
  email;

  listProvince = [];
  listDistrict = [];
  listWard = [];
  user: any = {
    id: null,
    code: null,
    fullname: '',
    phone: '',
    email: '',
  };

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
    const storedUserString = localStorage.getItem('customer');

    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      this.user = {
        id: storedUser.id,
        code: storedUser.code,
        fullname: storedUser.fullname,
        phone: storedUser.phone,
        email: storedUser.email,
      };
    }
    // @ts-ignore
    window.scrollTo(top, 0, 0);
  }

  ngOnInit(): void {
    // console.log(this.user);
    console.log('user' + this.user.id);
    this.totalMoney = 0;
    this.totalSaveMoney = 0;
    this.totalMoneyPay = 0;
    this.order.receiver = this.user.fullname;
    this.order.receiverPhone = this.user.phone;
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
    this.getAddress(this.user.id);
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
      to_district_id: this.addressNotLogin.districtId,
      to_ward_code: this.addressNotLogin.wardCode,
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
    debugger
    if (this.user.id ===  null && this.user.code === null) {
      let province = this.listProvince.find(c => c.ProvinceID === this.addressNotLogin.provinceId);
      // console.log(province);
      let district = this.listDistrict.find(d => d.DistrictID === this.addressNotLogin.districtId);
      let ward = this.listWard.find(w => w.WardCode === this.addressNotLogin.wardCode);
      if (this.checkChoicePay === 1) {
        const obj = {
          ...this.order,
          totalPrice: this.totalMoney,
          totalPayment: this.totalMoneyPay,
          shipPrice: this.shipFee,
          codeVoucher: this.voucher ? this.voucher.code : null,
          addressReceived: this.addressNotLogin.specificAddress + ', ' + ward.WardName + ', '
            + district.DistrictName + ', ' + province.ProvinceName,
          paymentType: 1,
        };
        this.orderService.createOrderNotLogin(obj).subscribe(res => {
          if (res.status === 'OK') {
            const objCheckOut = {
              order: res.data,
              listCart: this.listCart,
              email: this.email
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
          shipPrice: this.shipFee,
          codeVoucher: this.voucher ? this.voucher.code : null,
          addressReceived: this.addressNotLogin.specificAddress + ', ' + ward.WardName + ', '
            + district.DistrictName + ', ' + province.ProvinceName,
          paymentType: 0,
        };
        this.orderService.createOrderNotLogin(obj).subscribe(res => {
          if (res.status === 'OK') {
            const objCheckOut = {
              order: res.data,
              listCart: this.listCart,
              email: this.email
            };
            sessionStorage.setItem('order', JSON.stringify(objCheckOut));
            this.route.navigate(['cart/checkout-detail']);
          }
        });
      }
    } else {
      if (this.checkChoicePay === 1) {
        const obj = {
          ...this.order,
          customerDTO: {
            code: this.user.code,
          },
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
      } else {
        const obj = {
          ...this.order,
          customerDTO: {
            code: this.user.code,
          },
          totalPrice: this.totalMoney,
          shipPrice: this.shipFee,
          codeVoucher: this.voucher ? this.voucher.code : null,
          addressReceived: this.address.specificAddress + ', ' + this.address.wards + ', '
            + this.address.district + ', ' + this.address.province,
          paymentType: 0,
        };
        this.orderService.createOrder(obj).subscribe(res => {
          if (res.status === 'OK') {
            const objCheckOut = {
              order: res.data,
              listCart: this.listCart,
            };
            sessionStorage.setItem('order', JSON.stringify(objCheckOut));
            this.route.navigate(['cart/checkout-detail']);
          }
        });
      }
    }
  }

  openPopupAddress() {
    this.matDialog.open(AddressCheckoutComponent, {
      width: '40%',
      height: '65vh',
      data: this.user.id
    }).afterClosed().subscribe(res => {
      if (res === 'close-address') {
        this.ngOnInit();
      }
    });
  }

  openVoucher() {
    this.matDialog.open(PopupVoucherComponent, {
      width: '45%',
      height: '70vh',
      data: this.totalMoney
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
