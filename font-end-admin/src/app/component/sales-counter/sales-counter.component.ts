import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {CookieService} from 'ngx-cookie-service';
import {UsersDTO} from '../model/UsersDTO';
import {OrderService} from '../../service/order.service';
import {OrderDetailService} from '../../service/order-detail.service';
import {Order} from '../model/Order';
import {OrderDetail} from '../model/OrderDetail';
import {forkJoin} from 'rxjs';
import {Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {SizeService} from '../../service/size.service';
import {MausacService} from '../../service/mausac.service';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {CustomerComponent} from '../customer/customer.component';
import {CustomerServiceService} from '../../service/customer-service.service';
import {CustomerSalesDTO} from '../model/CustomerSalesDTO';
import {OrderSalesCounterComponent} from '../order-sales-counter/order-sales-counter.component';
@Component({
  selector: 'app-sales-counter',
  templateUrl: './sales-counter.component.html',
  styleUrls: ['./sales-counter.component.css'],
})

export class SalesCounterComponent implements OnInit {
  public isProductListVisible: boolean = true;
  public isCustomerNull: boolean = true;
  count = 1;
  searchTerm: string = '';
  showResults: boolean = false;
  listOder: any[] = [];
  searchResults: any[] = [];

  searcherCustomer: string = '';
  showCustomer: boolean = false;
  searchCustomerResults: any[] = [];

  listProductPush: any[] = [];
  totalPrice: number = 0;
  totalAllProducts: number = 0;
  priceVoucher: number = 0;
  userDTO: string;
  fullname: string;
  idStaff: string;
  currentOrderId: number | null = null;
  listSizePR: any[];
  listColor: any[];
  name: string;
  animal: string;
  selectedOption: string = '1';
  customerDTO: CustomerSalesDTO;
  selectedCustomer: any;
  idCustomer: number;
  constructor(private productService: ProductService, private cookieService: CookieService,
              private orderService: OrderService, private orderDetailService: OrderDetailService,
              private router: Router, private sizeService: SizeService, private colorService: MausacService,
              private dialog: MatDialog, private customerService: CustomerServiceService
              ) { }
  search() {
    this.isProductListVisible = true;
    if (this.searchTerm.trim() === ''){
      console.log('mời nhập tên hoặc mã sản phẩm');
    }else {
      this.productService.searchProduct(this.searchTerm).subscribe(
        data => {
          this.searchResults = data;
        }
      );
    }
    this.showResults = this.searchTerm.length > 0;
  }
  searchCustomer(){
    this.idCustomer = null;
    this.isCustomerNull = true;
    if (this.searcherCustomer.trim() === '' ){
      console.log('Mời nhập sdt khách hàng');
      this.isCustomerNull = false;
    }else {
      this.customerService.findCustomerByPhone(this.searcherCustomer).subscribe(
        customer => {
          this.searchCustomerResults = customer;
          console.log(customer);
          this.idCustomer = customer[0].id;
          console.log(this.idCustomer);
        }
      );
      this.showCustomer = this.searcherCustomer.length > 0;
    }
  }
  addOrder(){
    this.count++;
    let order = {
      id: this.count,
      name: 'Hóa Đơn' + this.count,
      productList: []
    };
    this.listOder.push(order);
    this.cookieService.set('countOrder', this.count.toString());
    this.cookieService.set('listOrder', JSON.stringify(this.listOder));
  }
  removeOrder(order: any) {
    const index = this.listOder.indexOf(order);
    if (this.count >= 1){
      if (index !== -1) {
        this.listOder.splice(index, 1);
        this.count--;
      }
    }
    this.cookieService.set('countOrder', this.count.toString());
    this.cookieService.set('listOrder', JSON.stringify(this.listOder));
  }
  addProductInOrder(row: any) {
    if (!row.quantity) {
      row.quantity = 1;
    }
    this.listProductPush.push(row);
    this.cookieService.set("listProductPush", JSON.stringify(this.listProductPush));
    const currentOrderProducts = this.listProductPush.map(product => ({ ...product }));
    localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
    this.isProductListVisible = false;
    this.calculateTotalPrice();
    this.calculateTotalAllProducts();
    this.clearSearchTerm();
  }
  addCustomer(row: any){
    debugger
    if (!row.quantity) {
      row.quantity = 1;
    }
    this.searcherCustomer = `${row.fullname} - ${row.phone}`;
    this.selectedCustomer = row;
    this.isCustomerNull = false;
    console.log(this.selectedCustomer);
  }
  clearSearchTerm(): void {
    this.searchTerm = '';
  }
  getProductListForCurrentOrder() {
    const currentOrder = this.listOder.find(order => order.id === this.currentOrderId);
    if (currentOrder) {
      this.listProductPush = currentOrder.productList;
      this.calculateTotalPrice();
      this.calculateTotalAllProducts();
    }
  }
  removeProduct(index: number): void {
    if (index >= 0 && index < this.listProductPush.length) {
      this.listProductPush.splice(index, 1);
      this.calculateTotalPrice();
      this.cookieService.set("listProductPush", JSON.stringify(this.listProductPush));
      const currentOrderProducts = this.listProductPush.map(product => ({ ...product }));
      localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.listProductPush.reduce((total, product) => {
      const productTotal = product.price * product.quantity;
      product.total = productTotal;
      return total + productTotal;
    }, 0);
    this.calculateTotalAllProducts();
  }
  calculateTotalAllProducts() {
    this.totalAllProducts = this.listProductPush.reduce((total, product) => {
      const productTotal = product.price * product.quantity;
      return total + productTotal;
    }, 0);
  }

  placeOrderSales(){
    console.log(this.idCustomer);
    debugger
    console.log(this.selectedCustomer);
    const order: Order = {
      paymentType: 1,
      totalPrice: this.totalAllProducts,
      totalPayment: this.totalAllProducts,
      customerDTO: this.selectedCustomer,
      idCustomer: this.idCustomer,
    };
    this.orderService.createOrderSales(order).subscribe(
      (response) => {
        console.log('done', response);
        const saveIdOrder = response.data.id;
        const observables = this.listProductPush.map((product) => {
          const orderDetail: OrderDetail = {
            idOrder: saveIdOrder,
            idProductDetail: product.id,
            quantity: product.quantity,
            price: product.total,
          };
          return this.orderDetailService.createDetailSales(orderDetail);
        });

        forkJoin(observables).subscribe(
          (orderDetailResponses) => {
            alert('thanh toán thành công');
            localStorage.removeItem('listProductPush');
            this.listProductPush = [];
            this.removeOrder(order);
            this.calculateTotalAllProducts();
            this.cookieService.set('listOrder', JSON.stringify(this.listOder));
            console.log('done detail');
            const index = this.listOder.findIndex( order => order.id === this.currentOrderId);
            if (index !== -1) {
              this.listOder.splice(index, 1);
            }
          },
          (orderDetailError) => {
            console.log(observables);
            console.error('Lỗi khi lưu chi tiết đơn hàng:', orderDetailError);
          }
        );
      }
    );
  }

  onTabChange(event: MatTabChangeEvent): void {
    const selectedTabIndex = event.index;
    this.currentOrderId = this.listOder[selectedTabIndex].id;
    this.getProductListForCurrentOrder();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerComponent, {
      width: '1200px',
      height: '600px',
      data: {name: this.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogBill(): void {
    const dialogRef = this.dialog.open(OrderSalesCounterComponent, {
      width: '1200px',
      height: '600px',
      data: {name: this.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit(): void {
    const listOrderCookie = this.cookieService.get('listOrder');
    const countOrderCookie = this.cookieService.get('countOrder');
    if (countOrderCookie && listOrderCookie) {
      this.count = parseInt(countOrderCookie, 10);
      this.listOder = JSON.parse(listOrderCookie);
    } else {
      this.listOder.push({
        id: this.count,
        name: 'Hóa Đơn' + 1,
        productList: []
      });
      this.cookieService.set('listOrder', JSON.stringify(this.listOder));
    }
    this.getProductListForCurrentOrder();
    this.userDTO = localStorage.getItem('users');
    this.fullname = localStorage.getItem('fullname');
    this.idStaff = localStorage.getItem('id');
    this.listOder.forEach(order => {
      const orderProductsKey = `orderProducts_${order.id}`;
      const storedOrderProducts = localStorage.getItem(orderProductsKey);
      if (storedOrderProducts) {
        order.productList = JSON.parse(storedOrderProducts);
      }
    });
    this.sizeService.getAllSize().subscribe(data =>{
      this.listSizePR = data;
    });
    this.colorService.getAllMauSac().subscribe(data =>{
      this.listColor = data;
    });
    this.selectedOption = '0';
  }

}
