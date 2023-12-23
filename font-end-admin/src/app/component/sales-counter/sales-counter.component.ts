import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {CookieService} from 'ngx-cookie-service';
import {UsersDTO} from '../model/UsersDTO';
import {OrderService} from '../../service/order.service';
import {OrderDetailService} from '../../service/order-detail.service';
import {Order} from '../model/Order';
import {OrderDetail} from '../model/OrderDetail';
import {BehaviorSubject, forkJoin} from 'rxjs';
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
import * as printJS from 'print-js';
import {ToastrService} from 'ngx-toastr';
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
  priceCustomer: number = 0;
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
  user: UsersDTO = {};
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  isdn: string;
  constructor(private productService: ProductService, private cookieService: CookieService,
              private orderService: OrderService, private orderDetailService: OrderDetailService,
              private router: Router, private sizeService: SizeService, private colorService: MausacService,
              private dialog: MatDialog, private customerService: CustomerServiceService, private toastr: ToastrService
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
    if (this.count > 1){
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
    // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
    const existingProduct = this.listProductPush.find(product => product.id === row.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.listProductPush.push(row);
    }

    this.cookieService.set("listProductPush", JSON.stringify(this.listProductPush));
    const currentOrderProducts = this.listProductPush.map(product => ({ ...product }));
    localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
    this.isProductListVisible = false;
    this.calculateTotalPrice();
    this.calculateTotalAllProducts();
    this.clearSearchTerm();
    this.priceVouchers();
  }

  addCustomer(row: any){
    if (!row.quantity) {
      row.quantity = 1;
    }
    this.searcherCustomer = `${row.fullname} - ${row.phone}`;
    this.selectedCustomer = row;
    this.isCustomerNull = false;
    this.idCustomer = this.selectedCustomer.id;
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
      this.priceVoucher = 0;
      this.priceVouchers();
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
    this.priceVouchers();
  }
  calculateTotalAllProducts() {
    this.totalAllProducts = this.listProductPush.reduce((total, product) => {
      const productTotal = product.price * product.quantity;
      return total + productTotal;
    }, 0);
  }
  priceVouchers(){
    if (this.priceVoucher === 0){
      this.priceCustomer = this.totalAllProducts;
    } else {
      this.priceCustomer = this.totalAllProducts - this.priceVoucher;
    }

  }
  placeOrderSales(){
    debugger
    console.log(this.idCustomer);
    console.log(this.selectedCustomer);
    if (this.listProductPush.length === 0){
      this.toastr.error('Không có sản phẩm nào để thanh toán', 'Lỗi');
      return;
    }
    this.user = JSON.parse(localStorage.getItem('users'));
    this.isdn = this.user.isdn;
    console.log(this.isdn);
    if (this.user === null){
      this.toastr.error('đã hết hạn đăng nhập');
    }
    const order: Order = {
      paymentType: 1,
      totalPrice: this.priceCustomer,
      totalPayment: this.priceCustomer,
      customerDTO: this.selectedCustomer,
      idCustomer: this.idCustomer,
      idStaff: this.user.id,
      statusPayment: this.selectedOption,
      email: 'customer123@gmail.com'
    };
    this.orderService.createOrderSales(order).subscribe(
      (response) => {
        console.log('done', response);
        const saveIdOrder = response.data.id;
        const observables = this.listProductPush.map((product) => {
          // @ts-ignore
          const orderDetail: OrderDetail = {
            idOrder: saveIdOrder,
            idProductDetail: product.id,
            quantity: product.quantity,
            price: this.priceCustomer,
          };
          return this.orderDetailService.createDetailSales(orderDetail);
        });

        forkJoin(observables).subscribe(
          (orderDetailResponses) => {
            this.printInvoice();
            this.toastr.success('Thanh toán thành công', 'Success');
            localStorage.removeItem('listProductPush');
            this.selectedCustomer = '';
            this.searcherCustomer = '';
            this.idCustomer = null;
            this.priceCustomer = 0;
            this.priceVoucher = 0;
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
  generateOrderHTML(): string {
    let orderHTML = `<div>`;
    orderHTML += `<h2>Hóa đơn</h2>`;
    orderHTML += `<p>Tên nhân viên: ${this.fullname}</p>`;
    orderHTML += `<p>Tên khách hàng: ${this.selectedCustomer?.fullname}</p>`;
    orderHTML += `<p>Số điện thoại: ${this.selectedCustomer?.phone}</p>`;
    orderHTML += `<h3>Chi tiết đơn hàng</h3>`;
    orderHTML += `<table border="1" cellpadding="10">`;
    orderHTML += `<thead>`;
    orderHTML += `<tr>`;
    orderHTML += `<th>Mã</th>`;
    orderHTML += `<th>Size</th>`;
    orderHTML += `<th>Màu Sắc</th>`;
    orderHTML += `<th>Tên</th>`;
    orderHTML += `<th>Số lượng</th>`;
    orderHTML += `<th>Đơn giá</th>`;
    orderHTML += `<th>Thành tiền</th>`;
    orderHTML += `</tr>`;
    orderHTML += `</thead>`;
    orderHTML += `<tbody>`;
    this.listProductPush.forEach(product => {
      orderHTML += `<tr>`;
      orderHTML += `<td>${product.code}</td>`;
      orderHTML += `<td>${product.size}</td>`;
      orderHTML += `<td>${product.color}</td>`;
      orderHTML += `<td>${product.name}</td>`;
      orderHTML += `<td>${product.quantity}</td>`;
      orderHTML += `<td>${product.price}</td>`;
      orderHTML += `<td>${product.total}</td>`;
      orderHTML += `</tr>`;
    });
    orderHTML += `</tbody>`;
    orderHTML += `</table>`;
    orderHTML += `<p>Giảm giá: ${this.priceVoucher}</p>`;
    orderHTML += `<p>Tổng thanh toán: ${this.priceCustomer}</p>`;
    orderHTML += `</div>`;
    return orderHTML;
  }

  printInvoice() {
    const invoiceHTML = this.generateOrderHTML();
    const frame = document.createElement('iframe');
    frame.style.display = 'none';
    document.body.appendChild(frame);
    frame.contentDocument.open();
    frame.contentDocument.write(invoiceHTML);
    frame.contentDocument.close();
    printJS({
      printable: frame.contentDocument.body,
      type: 'html',
      properties: ['name', 'quantity', 'price', 'total'],
      header: '<h3 class="custom-h3">Hóa đơn bán hàng</h3>',
      style: '.custom-h3 { color: red; }',
      documentTitle: 'hoa don',
    });

    document.body.removeChild(frame);
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
      width: '1300px',
      height: '700px',
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
      console.log(this.listSizePR);
    });
    this.colorService.getAllMauSac().subscribe(data =>{
      this.listColor = data;
    });
    this.selectedOption = '0';

  }
  validateNullListProduct(): boolean {
      if (this.listProductPush === null ){
        return false;
      }
      return true;
  }
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.searchTerm = resultString;
    if (this.searchTerm.trim() === '') {
      console.log('Mời nhập tên hoặc mã sản phẩm');
    } else {
      this.productService.searchProduct(this.searchTerm).subscribe(
        data => {
          this.searchResults = data;
          const existingProduct = this.listProductPush.find(product => product.id === this.searchResults[0].id);

          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            const newProduct = { ...this.searchResults[0], quantity: 1 };
            this.listProductPush.push(newProduct);
          }

          this.cookieService.set("listProductPush", JSON.stringify(this.listProductPush));
          const currentOrderProducts = this.listProductPush.map(product => ({ ...product }));
          localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
          this.isProductListVisible = false;
          this.calculateTotalPrice();
          this.calculateTotalAllProducts();
          this.clearSearchTerm();
          this.priceVouchers();
        }, error => {
          this.toastr.error('Sản phẩm không tồn tại', 'Lỗi');
        }
      );
    }
  }


  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

}
