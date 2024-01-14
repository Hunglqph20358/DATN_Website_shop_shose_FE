import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
import {ProductdetailService} from '../../service/productdetail.service';
import {GiaoHangServiceService} from '../../service/giao-hang-service.service';
import Swal from 'sweetalert2';
import {PaymentSalesService} from '../../service/payment-sales.service';
import {UtilService} from '../../util/util.service';

@Component({
  selector: 'app-sales-counter',
  templateUrl: './sales-counter.component.html',
  styleUrls: ['./sales-counter.component.css'],
})

export class SalesCounterComponent implements OnInit {
  public isProductListVisible: boolean = true;
  public isCustomerNull: boolean = true;
  isChecked: boolean = false;
  count = 1;
  searchTerm: string = '';
  showResults: boolean = false;
  listOder: any[] = [];
  searchResults: any[] = [];searcherCustomer: string = '';
  showCustomer: boolean = false;
  searchCustomerResults: any[] = [];
  listProductPush: any[] = [];
  totalAllProducts: number = 0;
  priceCustomer: number = 0;
  priceVoucher: number = 0;
  userDTO: string;
  fullname: string;
  idStaff: string;
  currentOrderId: number | null = null;
  listSizePR: any[];
  listColor: any[];
  listSizeFind: any[];
  lisColorFind: any[];
  name: string;
  animal: string;
  selectedOption: string = '1';
  selectedCustomer: any;
  idCustomer: number = 1;
  user: UsersDTO = {};
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  product: any;
  qrResultString: string;
  colorId: number | null = null;
  sizeId: number | null = null;
  torchEnabled = false;
  tryHarder = false;
  isdn: string;
  checkStatus: number = 0;
  listCart = [];
  observable: any = [];
  listProductDetail: any = [];
  listProvince = [];
  listDistrict = [];
  listWard = [];
  addressNotLogin: any = {
    provinceId: undefined,
    districtId: undefined,
    wardCode: undefined,
    specificAddress: undefined
  };
  shipFee = 0;
  shipFeeReduce = null;
  totalMoneyPay;
  typeOrder: number | null = null;
  statusOrder: number | null = null;
  receiver: string ;
  receiver_phone: string;
  constructor(private productService: ProductService, private cookieService: CookieService,
              private orderService: OrderService, private orderDetailService: OrderDetailService,
              private router: Router, private sizeService: SizeService, private colorService: MausacService,
              private dialog: MatDialog, private customerService: CustomerServiceService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              private productDetailService: ProductdetailService, private giaoHangService: GiaoHangServiceService, private paymentService: PaymentSalesService,
              public utilService: UtilService
  ) {
  }

  search() {
    this.isProductListVisible = true;
    if (this.searchTerm.trim() === '') {
      console.log('mời nhập tên hoặc mã sản phẩm');
    } else {
      this.productService.searchProduct(this.searchTerm).subscribe(
        data => {
          this.searchResults = data;
        }
      );
    }
    this.showResults = this.searchTerm.length > 0;
  }

  searchCustomer() {
    this.idCustomer = null;
    this.isCustomerNull = true;
    if (this.searcherCustomer.trim() === '') {
      console.log('Mời nhập sdt khách hàng');
      this.isCustomerNull = false;
      this.idCustomer = 1;
    } else {
      this.customerService.findCustomerByPhone(this.searcherCustomer).subscribe(
        customer => {
          this.searchCustomerResults = customer;
        }
      );
      this.showCustomer = this.searcherCustomer.length > 0;
    }
  }

  addOrder() {
    this.count++;
    let order = {
      id: this.count,
      name: 'Hóa Đơn' + this.count,
      productList: []
    };
    this.listOder.push(order);
    localStorage.setItem('coutOrder', this.count.toString());
    localStorage.setItem('listOrder', JSON.stringify(this.listOder));
    console.log(order);
  }

  removeOrder(order: any) {
    const index = this.listOder.indexOf(order);
    console.log(order);
    if (this.count > 1) {
      if (index !== -1) {
        this.listOder.splice(index, 1);
        this.count--;
      }
    }
    localStorage.setItem('coutOrder', this.count.toString());
    localStorage.setItem('listOrder', JSON.stringify(this.listOder));
  }
  addProductInOrder(row: any) {
    if (!row.quantity) {
      row.quantity = 1;
    }
    this.listProductPush.push(row);
    this.listCart.push(
      {
        productId: row.id,
        productDetailId: null,
        sizeId: null,
        size_number: null,
        colorId: null,
        nameColor: null,
        quantity: 1,
        price: row.price
      }
    );
    // this.listProductPush.push(row);
    this.cookieService.set('listProductPush', JSON.stringify(this.listProductPush));
    const currentOrderProducts = this.listProductPush.map(product => ({...product}));
    localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
    this.isProductListVisible = false;
    // this.calculateTotalPrice();
    this.calculateTotalAllProducts();
    this.clearSearchTerm();
    this.priceVouchers();
    this.loadData();
  }

  addCustomer(row: any) {
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
      // this.calculateTotalPrice();
      this.calculateTotalAllProducts();
    }
  }

  removeProduct(index: number): void {
    //thêm confirm
    this.listCart.splice(index, 1);
    this.listCart = [...this.listCart];

    console.log('Xóa: ', this.listCart);
    this.listProductPush.splice(index, 1);
    this.cdr.detectChanges();
    this.calculateTotalAllProducts();
  }

  // calculateTotalPrice() {
  //   this.totalPrice = this.listProductPush.reduce((total, product) => {
  //     const productTotal = product.price * product.quantity;
  //     product.total = productTotal;
  //     return total + productTotal;
  //   }, 0);
  //   this.calculateTotalAllProducts();
  //   this.priceVouchers();
  // }

  calculateTotalAllProducts() {
    this.totalAllProducts = 0;
    for (let i = 0; i < this.listCart.length; i++) {
      const totalPrice = this.listCart[i].quantity * this.listCart[i].price;
      this.totalAllProducts += totalPrice;
    }
    this.priceVouchers();
  }

  priceVouchers() {
    if (this.priceVoucher === 0) {
      this.priceCustomer = this.totalAllProducts ;
    } else {
      this.priceCustomer = this.totalAllProducts  - this.priceVoucher;
    }

  }

  onSizeChange(event: any, i): void {
    console.log(event);
    console.log(i);

    if (event === undefined) {
      this.listColor = [...this.lisColorFind];
    } else {
      const selectedSizeId = event.id;
      const number_size = event.sizeNumber;
      const detailsForSelectedSize = this.listProductPush[i].productDetailDTOList
        .filter(detail => detail.idSize === selectedSizeId && detail.idColor);
      const colorIDsForSelectedSize = detailsForSelectedSize.map(detail => detail.idColor);
      this.listColor = this.listColor.filter(color => colorIDsForSelectedSize.includes(color.id));
      this.listCart[i] = {
        ...this.listCart[i],
        sizeId: selectedSizeId,
        size_number: number_size
      };
      this.getProductDetail(i);
      console.log(this.listCart);
    }
  }

  getProductDetail(index: any) {
    if (this.listCart[index].sizeId !== null && this.listCart[index].colorId !== null) {
      this.listProductPush[index].productDetailDTOList.filter(d => d.idSize === this.listCart[index].sizeId && d.idColor === this.listCart[index].colorId).map(pd => {
        console.log(pd.id);
        return this.listCart[index] = {
          ...this.listCart[index],
          productDetailId: pd.id
        };
      });
      console.log('ProductDetail: ', this.listCart);
    } else {
      return;
    }
  }

  onColorChange(event: any, i: any): void {

    if (event === undefined) {
      this.listSizePR = [...this.listSizeFind];
    } else {
      const selectedColorId = event.id;
      const colorName = event.name;
      const detailsForSelectedColor = this.listProductPush[i].productDetailDTOList
        .filter(detail => detail.idColor === selectedColorId && detail.idSize);

      const sizeIDsForSelectedColor = detailsForSelectedColor.map(detail => detail.idSize);

      this.listSizePR = this.listSizePR.filter(size => sizeIDsForSelectedColor.includes(size.id));
      this.listCart[i] = {
        ...this.listCart[i],
        colorId: selectedColorId,
        nameColor: colorName
      };
      this.getProductDetail(i);
    }
  }

  placeOrderSales() {
    if (this.listCart.some(c => c.sizeId === null || c.colorId === null)) {
      this.toastr.error('chưa chọn size và màu sắc của sản phẩm');
      return;
    }
    this.user = JSON.parse(localStorage.getItem('users'));
    this.isdn = this.user.isdn;
    console.log(this.isdn);
    if (this.user === null) {
      this.toastr.error('đã hết hạn đăng nhập');
    }
    if (this.isChecked === true){
       this.typeOrder = 0;
       this.statusOrder = 1;

    }else {
       this.typeOrder = 1;
       this.statusOrder = 3;
    }
    Swal.fire({
      title: 'Bạn có xác nhận thanh toán đơn hàng ?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý'
    }).then((result) => {
      if (result.isConfirmed) {
        let province = this.listProvince.find(c => c.ProvinceID === this.addressNotLogin.provinceId);
        // console.log(province);
        let district = this.listDistrict.find(d => d.DistrictID === this.addressNotLogin.districtId);
        let ward = this.listWard.find(w => w.WardCode === this.addressNotLogin.wardCode);
        if (this.selectedOption === '1') {
          const order: Order = {
            paymentType: 1,
            totalPrice: this.priceCustomer,
            totalPayment: this.priceCustomer,
            idCustomer: this.idCustomer,
            idStaff: this.user.id,
            addressReceived: this.addressNotLogin?.specificAddress + ', ' + ward?.WardName + ', '
              + district?.DistrictName + ', ' + province?.ProvinceName,
            statusPayment: 0,
            shipPrice: this.shipFee,
            email: 'customer123@gmail.com',
            type: this.typeOrder,
            status: this.statusOrder,
            receiver: this.receiver,
            receiverPhone: this.receiver_phone
          };
          this.orderService.createOrderSales(order).subscribe(
            (response) => {
              console.log('done', response);
              const saveIdOrder = response.data.id;
              console.log(this.listProductPush);

              for (let i = 0; i < this.listCart.length; i++) {
                const orderDetail: OrderDetail = {
                  idOrder: saveIdOrder,
                  idProductDetail: this.listCart[i].productDetailId,
                  quantity: this.listCart[i].quantity,
                  price: this.listCart[i].price,
                };
                console.log(orderDetail);
                this.orderDetailService.createDetailSales(orderDetail).subscribe(res => {
                  if (res.status === 'OK') {
                    console.log('thanh toán thành công');
                  } else {
                    this.checkStatus = 1;
                    console.log('Lỗi');
                    return;
                  }
                });
              }
            }
          );
          this.paymentService.createPayment(this.priceCustomer).subscribe(resPay => {
            if (resPay.status === 'OK') {
              // sessionStorage.setItem('order', JSON.stringify(objCheckOut));
              // setTimeout()
              this.toastr.success('thanh toán thành công');
              window.location.href = resPay.url;
            }
          });
          //   }
          // });
        } else {
          const order: Order = {
            paymentType: 0,
            totalPrice: this.priceCustomer,
            totalPayment: this.priceCustomer,
            idCustomer: this.idCustomer,
            shipPrice: this.shipFee,
            idStaff: this.user.id,
            addressReceived: this.addressNotLogin?.specificAddress + ', ' + ward?.WardName + ', '
              + district?.DistrictName + ', ' + province?.ProvinceName,
            statusPayment: 0,
            email: 'customer123@gmail.com',
            type: this.typeOrder,
            status: this.statusOrder,
            receiver: this.receiver,
            receiverPhone: this.receiver_phone
          };
          this.orderService.createOrderSales(order).subscribe(
            (response) => {
              console.log('done', response);
              const saveIdOrder = response.data.id;
              console.log(this.listProductPush);

              for (let i = 0; i < this.listCart.length; i++) {
                const orderDetail: OrderDetail = {
                  idOrder: saveIdOrder,
                  idProductDetail: this.listCart[i].productDetailId,
                  quantity: this.listCart[i].quantity,
                  price: this.listCart[i].price,
                };
                console.log(orderDetail);
                this.orderDetailService.createDetailSales(orderDetail).subscribe(res => {
                  if (res.status === 'OK') {
                    console.log('thanh toán thành công');
                  } else {
                    this.checkStatus = 1;
                    console.log('Lỗi');
                    return;
                  }
                });
              }
              console.log(this.observable);
              this.toastr.success('Thanh toán thành công');
              this.printInvoice();
              localStorage.removeItem('listProductPush');
              this.selectedCustomer = '';
              this.searcherCustomer = '';
              this.idCustomer = 1;
              this.priceCustomer = 0;
              this.priceVoucher = 0;
              this.listCart = [];
              this.totalAllProducts = 0;
              this.listProductPush = [];
              this.removeOrder(order);
              this.calculateTotalAllProducts();
              localStorage.setItem('coutOrder', this.count.toString());
              localStorage.setItem('listOrder', JSON.stringify(this.listOder));
            }
          );
        }
      }
    });
  }

  generateOrderHTML(): string {
    let orderHTML = `<div>`;
    orderHTML += `<h2>Hóa đơn</h2>`;
    orderHTML += `<p>Tên nhân viên: ${this.fullname}</p>`;
    orderHTML += `<p>Tên khách hàng: ${this.selectedCustomer ? this.selectedCustomer.fullname : 'Khách lẻ'}</p>`;
    orderHTML += `<p>Số điện thoại: ${this.selectedCustomer ? this.selectedCustomer.phone : ''}</p>`;
    orderHTML += `<h3>Chi tiết đơn hàng</h3>`;
    orderHTML += `<table border="1" cellpadding="10">`;
    orderHTML += `<thead>`;
    orderHTML += `<tr>`;
    orderHTML += `<th>Mã</th>`;
    orderHTML += `<th>Tên</th>`;
    orderHTML += `<th>Size</th>`;
    orderHTML += `<th>Màu Sắc</th>`;
    orderHTML += `<th>Số lượng</th>`;
    orderHTML += `<th>Đơn giá</th>`;
    orderHTML += `<th>Thành tiền</th>`;
    orderHTML += `</tr>`;
    orderHTML += `</thead>`;
    orderHTML += `<tbody>`;
    this.listProductPush.forEach(product => {
      orderHTML += `<tr>`;
      orderHTML += `<td>${product.code}</td>`;
      orderHTML += `<td>${product.name}</td>`;
      this.listCart.forEach(details => {
        if (product.id === details.productId){
          orderHTML += `<td>${details.size_number}</td>`;
          orderHTML += `<td>${details.nameColor}</td>`;
          orderHTML += `<td>${details.quantity}</td>`;
          orderHTML += `<td>${details.price}</td>`;
          orderHTML += `<td>${details.quantity * details.price}</td>`;
        }
      });
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
    const listOrderCookie = localStorage.getItem('listOrder');
    const countOrderCookie = localStorage.getItem('coutOrder');
    if (countOrderCookie && listOrderCookie) {
      this.count = parseInt(countOrderCookie, 10);
      this.listOder = JSON.parse(listOrderCookie);
    } else {
      this.listOder.push({
        id: this.count,
        name: 'Hóa Đơn' + this.count,
        productList: []
      });
      localStorage.setItem('coutOrder', this.count.toString());
      localStorage.setItem('listOrder', JSON.stringify(this.listOder));
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
    this.selectedOption = '0';
    this.loadData();
    this.giaoHangService.getAllProvince().subscribe(res => {
      this.listProvince = res.data;
    });
  }

  loadData() {
    this.sizeService.getAllSize().subscribe(data => {
      this.listSizePR = data;
      this.listSizeFind = data;
    });
    this.colorService.getAllMauSac().subscribe(datams => {
      this.listColor = datams;
      this.lisColorFind = datams;
    });
    this.productDetailService.getAllProductDetail().subscribe(dataDT => {
      this.listProductDetail = dataDT;
      console.log(this.listProductDetail);
    });
  }

  validateNullListProduct(): boolean {
    if (this.listProductPush === null) {
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
            const newProduct = {...this.searchResults[0], quantity: 1};
            this.listProductPush.push(newProduct);
          }
          this.cookieService.set('listProductPush', JSON.stringify(this.listProductPush));
          const currentOrderProducts = this.listProductPush.map(product => ({...product}));
          localStorage.setItem(`orderProducts_${this.currentOrderId}`, JSON.stringify(currentOrderProducts));
          this.isProductListVisible = false;
          // this.calculateTotalPrice();
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
  // getAddress(id: number) {
  //   const obj = {
  //     idCustomer: id
  //   };
  //   this.addressService.getAddress(obj).subscribe(res => {
  //     this.address = res.data;
  //     const addressInfo = {
  //       service_type_id: 2,
  //       from_district_id: 3440,
  //       to_district_id: parseInt(res.data.districtId, 10),
  //       to_ward_code: res.data.wardCode,
  //       height: 20,
  //       length: 30,
  //       weight: 200,
  //       width: 40,
  //       insurance_value: 0,
  //     };
  //     this.giaoHangService.getTinhPhiShip(addressInfo).subscribe(res2 => {
  //       this.shipFee = res2.data.service_fee;
  //       this.totalMoneyPay = this.shipFee + this.totalMoneyPay;
  //     });
  //   });
  // }

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
      this.priceCustomer = this.shipFee + this.priceCustomer;
    });
  }
  selectedOpsiontGH(){
    if (this.isChecked === false){
      this.isChecked = true;
    }else {
      this.isChecked = false;
    }
  }
}
