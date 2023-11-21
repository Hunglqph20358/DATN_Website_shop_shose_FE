import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDetailService} from '../../../service/order-detail.service';
import {CookieService} from 'ngx-cookie-service';
import {EmailService} from '../../../service/email.service';
import {UtilService} from '../../../util/util.service';

@Component({
  selector: 'app-detail-checkout',
  templateUrl: './detail-checkout.component.html',
  styleUrls: ['./detail-checkout.component.css']
})
export class DetailCheckoutComponent implements OnInit {

  listCart: any = [];
  order: any;
  // responsePayment: any = {
  //   vnp_CardType: null,
  //   vnp_BankCode: null,
  //
  // };
  status: any;
  email: any;

  constructor(private route: ActivatedRoute, private orderDetailService: OrderDetailService,
              private cookieService: CookieService, private emailService: EmailService, public utilService: UtilService) {
    const session = JSON.parse(sessionStorage.getItem('order'));
    this.order = session.order;
    this.listCart = session.listCart;
    this.email = session.email;
    status = this.route.snapshot.queryParamMap.get('vnp_TransactionStatus');
  }

  ngOnInit(): void {
    console.log(this.order);
    console.log(this.listCart);
    if (status === '00') {
      this.listCart.forEach(item => {
        const obj = {
          idOrder: this.order.id,
          idProductDetail: item.productDetailDTO.id,
          quantity: item.quantity,
          price: item.productDTO.price
        };
        this.orderDetailService.createOrderDetail(obj).subscribe(res => {
        });
      });
      if (this.email === null || this.email === undefined) {
        this.emailService.sendEmail(this.order).subscribe(res => {
          sessionStorage.removeItem('order');
          this.cookieService.delete('cart');
          this.cookieService.delete('checkout');
        });
      } else {
        const obj = {
          ...this.order,
          email: this.email
        };
        this.emailService.sendEmailNotLogin(obj).subscribe(res => {
          sessionStorage.removeItem('order');
          this.cookieService.delete('cart');
          this.cookieService.delete('checkout');
        });
      }
    }
  }

  calculateTotal(price: number, quantity: number): string {
    const total = price * quantity;
    return this.utilService.formatMoney(total);
  }

  openDonMua() {

  }

  openHome() {

  }
}
