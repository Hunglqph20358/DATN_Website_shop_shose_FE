import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDetailService} from '../../../service/order-detail.service';
import {CookieService} from 'ngx-cookie-service';
import {EmailService} from '../../../service/email.service';
import {UtilService} from '../../../util/util.service';
import {CartService} from '../../../service/cart.service';

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
  statusPayment: any;
  email: any;

  constructor(private route: ActivatedRoute, private orderDetailService: OrderDetailService,
              private cookieService: CookieService, private emailService: EmailService, public utilService: UtilService, private cartService: CartService) {
    const session = JSON.parse(sessionStorage.getItem('order'));
    this.order = session.order;
    this.listCart = session.listCart;
    this.email = session.email;
    this.statusPayment = this.route.snapshot.queryParamMap.get('vnp_TransactionStatus');
    sessionStorage.removeItem('order');
    this.cookieService.delete('cart', '/');
    this.cookieService.delete('checkout', '/');
    this.cartService.updateTotalProducts(0);
  }

  ngOnInit(): void {
    console.log(this.order);
    console.log(this.listCart);

    if (this.statusPayment === '00' && this.order.paymentType === 1) {
      const orderDetailPromises = this.listCart.map(item => {
        const obj = {
          idOrder: this.order.id,
          idProductDetail: item.productDetailDTO.id,
          quantity: item.quantity,
          price: item.productDTO?.reducePrice != null || item.productDTO?.percentageReduce != null ? (item.productDTO.price - item.productDTO.reducePrice) : item.productDTO.price,
          codeDiscount: item.productDTO?.reducePrice != null || item.productDTO?.percentageReduce != null ? item.productDTO.codeDiscount : null,
        };
        return this.orderDetailService.createOrderDetail(obj).toPromise();
      });
      Promise.all(orderDetailPromises)
        .then(() => {
          if (this.email === null || this.email === undefined) {
            this.emailService.sendEmail(this.order).subscribe(res => {
            });
          } else {
            const obj = {
              ...this.order,
              email: this.email
            };
            this.emailService.sendEmailNotLogin(obj).subscribe(res => {
            });
          }
        })
        .catch(error => {
          console.error('Error creating order details:', error);
        })
        .finally(() => {
        });
    }
    if (this.order.paymentType === 0) {
      const orderDetailPromises = this.listCart.map(item => {
        const obj = {
          idOrder: this.order.id,
          idProductDetail: item.productDetailDTO.id,
          quantity: item.quantity,
          price: item.productDTO?.reducePrice != null || item.productDTO?.percentageReduce != null ? (item.productDTO.price - item.productDTO.reducePrice) : item.productDTO.price,
          codeDiscount: item.productDTO?.reducePrice != null || item.productDTO?.percentageReduce != null ? item.productDTO.codeDiscount : null,
        };
        return this.orderDetailService.createOrderDetail(obj).toPromise();
      });
      Promise.all(orderDetailPromises)
        .then(() => {
            this.emailService.sendEmail(this.order).subscribe(res => {
            });
        })
        .catch(error => {
          console.error('Error creating order details:', error);
        })
        .finally(() => {
        });
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
  checkPrice(value){
    if(value.productDTO.reducePrice != null || value.productDTO.percentageReduce != null){

    }
  }
}
