import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderDetailService} from '../../../service/order-detail.service';

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

  constructor(private route: ActivatedRoute, private orderDetailService: OrderDetailService) {
    const session = JSON.parse(sessionStorage.getItem('order'));
    this.order = session.order;
    this.listCart = session.listCart;
    status = this.route.snapshot.queryParamMap.get('vnp_TransactionStatus');
  }

  ngOnInit(): void {
    console.log(this.order);
    console.log(this.listCart);
    if (status === '00') {
      debugger
      this.listCart.forEach(item => {
        const obj = {
          idOrder: this.order.id,
          idProductDetail: item.productDetailDTO.id,
          quantity: item.quantity,
          price: item.productDetailDTO.price
        };
        this.orderDetailService.createOrderDetail(obj).subscribe(res => {
        });
      });
    }
  }

  openDonMua() {

  }

  openHome() {

  }
}
