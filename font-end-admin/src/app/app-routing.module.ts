import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DanhmucComponent} from './component/danhmuc/danhmuc.component';
import {SanphamComponent} from './component/sanpham/sanpham.component';
import {OrderComponent} from './component/order/order.component';
import {OderProcessingComponent} from './component/oder-processing/oder-processing.component';
import {StaffComponent} from './component/staff/staff.component';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './service/auth.guard';
import {RoleGuardService} from './service/role-guard.service';


import {DegiayComponent} from './component/degiay/degiay.component';
import {ChatlieuComponent} from './component/chatlieu/chatlieu.component';
import {MausacComponent} from './component/mausac/mausac.component';
import {KichcoComponent} from "./component/kichco/kichco.component";
import {ThuonghieuComponent} from "./component/thuonghieu/thuonghieu.component";
import {CreatDiscountComponent} from "./component/discount/creat-discount/creat-discount.component";
import {CreatVoucherComponent} from "./component/voucher/creat-voucher/creat-voucher.component";
import {DiscountComponent} from "./component/discount/discount.component";
import {DetailDiscountComponent} from "./component/discount/detail-discount/detail-discount.component";
import {DetailVoucherComponent} from "./component/voucher/detail-voucher/detail-voucher.component";
import {VoucherComponent} from "./component/voucher/voucher.component";
import {EditDiscountComponent} from "./component/discount/edit-discount/edit-discount.component";
import {EditVoucherComponent} from "./component/voucher/edit-voucher/edit-voucher.component";
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {OrderDetailComponent} from './component/order/order-detail/order-detail.component';
import {ThemSanPhamComponent} from './component/sanpham/them-san-pham/them-san-pham.component';
import {SuaSanPhamComponent} from './component/sanpham/sua-san-pham/sua-san-pham.component';
import {SalesCounterComponent} from './component/sales-counter/sales-counter.component';
import {ChitietsanphamComponent} from './component/chitietsanpham/chitietsanpham.component';
import {ThemChiTietSanPhamComponent} from './component/chitietsanpham/them-chi-tiet-san-pham/them-chi-tiet-san-pham.component';
import {SuaChiTietSanPhamComponent} from './component/chitietsanpham/sua-chi-tiet-san-pham/sua-chi-tiet-san-pham.component';
import {ThongKeComponent} from './component/thong-ke/thong-ke.component';
import {AddStaffComponent} from './component/staff/add-staff/add-staff.component';
import {OrderSalesCounterComponent} from './component/order-sales-counter/order-sales-counter.component';
import {UpdateStaffComponent} from './component/staff/update-staff/update-staff.component';
import {CreatVoucherShipComponent} from "./component/voucher-ship/creat-voucher-ship/creat-voucher-ship.component";
import {DetailVoucherShipComponent} from "./component/voucher-ship/detail-voucher-ship/detail-voucher-ship.component";
import {VoucherShipComponent} from "./component/voucher-ship/voucher-ship.component";
import {EditVoucherShipComponent} from './component/voucher-ship/edit-voucher-ship/edit-voucher-ship.component';

const routes: Routes = [
  {path: '', redirectTo: 'staff', pathMatch: 'full'},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/don-hang', component: HomeComponent},
  {path: 'admin/creat-discount', component: CreatDiscountComponent},
  {path: 'admin/creat-voucherFS', component: CreatVoucherShipComponent},
  {path: 'admin/creat-voucher', component: CreatVoucherComponent },
  {path: 'admin/discount', component: DiscountComponent},
  {path: 'admin/discount/:id', component: DetailDiscountComponent},
  {path: 'admin/voucher/:id', component: DetailVoucherComponent},
  {path: 'admin/voucherFS/:id', component: DetailVoucherShipComponent},
  {path: 'admin/voucher', component: VoucherComponent},
  {path: 'admin/sua-giam-gia', component: EditDiscountComponent},
  {path: 'admin/sua-voucher', component: EditVoucherComponent},
  // {path: 'degiay', component: DegiayComponent, canActivate: [RoleGuardService],
  //   data: {
  //     expectedRole: ['ADMIN']
  //   } },
  {path: 'admin/voucherFS', component: VoucherShipComponent},
  {path: 'admin/sua-giam-gia', component: EditDiscountComponent,  canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'admin/sua-voucher', component: EditVoucherComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'admin/sua-voucherFS', component: EditVoucherShipComponent,  canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'degiay', component: DegiayComponent},
  {path: 'admin/edit-discount/:id', component: EditDiscountComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'admin/edit-voucher/:id', component: EditVoucherComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'admin/edit-voucherFS/:id', component: EditVoucherShipComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'degiay', component: DegiayComponent, canActivate: [RoleGuardService],
    data: {
      expectedRole: ['ADMIN']
    }},
  {path: 'chatlieu', component: ChatlieuComponent, canActivate: [RoleGuardService]},
  {path: 'mausac', component: MausacComponent},
  {path: 'kichco', component: KichcoComponent},
  {path: 'thuonghieu', component: ThuonghieuComponent},
  {path: 'admin/danh-muc', component: DanhmucComponent},
  {path: 'admin/san-pham', component: SanphamComponent},
  {path: 'admin/chi-tiet-san-pham', component: ChitietsanphamComponent},
  {path: 'them-chi-tiet-san-pham', component: ThemChiTietSanPhamComponent},
  {path: 'sua-chi-tiet-san-pham/:idProduct', component: SuaChiTietSanPhamComponent},
  {path: 'them-san-pham', component: ThemSanPhamComponent},
  {path: 'sua-san-pham/:idProduct', component: SuaSanPhamComponent},
  {path: 'order-list', component: OrderComponent},
  {path: 'order-processing', component: OderProcessingComponent},
  {path: 'staff', component: StaffComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignUpComponent},
  // {path: 'order-detail', component: OrderDetailComponent},
  {path: 'sales-counter', component: SalesCounterComponent},
  {path: 'thong-ke', component: ThongKeComponent},
  {path: 'add-staff', component: AddStaffComponent},
  {path: 'order-sales-counter', component: OrderSalesCounterComponent},
  {path: 'update-staff/:id', component: UpdateStaffComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
