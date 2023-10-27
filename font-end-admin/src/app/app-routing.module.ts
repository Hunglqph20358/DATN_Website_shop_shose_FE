import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DegiayComponent} from './component/degiay/degiay.component';
import {ChatlieuComponent} from './component/chatlieu/chatlieu.component';
import {MausacComponent} from './component/mausac/mausac.component';
import {KichcoComponent} from './component/kichco/kichco.component';
import {ThuonghieuComponent} from './component/thuonghieu/thuonghieu.component';
import {DiscountComponent} from './component/discount/discount.component';
import {VoucherComponent} from './component/voucher/voucher.component';
import {CreatDiscountComponent} from './component/discount/creat-discount/creat-discount.component';
import {CreatVoucherComponent} from './component/voucher/creat-voucher/creat-voucher.component';
import {EditDiscountComponent} from './component/discount/edit-discount/edit-discount.component';
import {EditVoucherComponent} from './component/voucher/edit-voucher/edit-voucher.component';
import {DanhmucComponent} from './component/danhmuc/danhmuc.component';
import {SanphamComponent} from './component/sanpham/sanpham.component';


const routes: Routes = [
  {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  {path: 'admin/dashboard', component: HomeComponent},
  {path: 'admin/don-hang', component: HomeComponent},
  {path: 'admin/them-giam-gia', component: CreatDiscountComponent},
  {path: 'admin/them-voucher', component: CreatVoucherComponent},
  {path: 'admin/giam-gia', component: DiscountComponent},
  {path: 'admin/voucher', component: VoucherComponent},
  {path: 'admin/sua-giam-gia', component: EditDiscountComponent},
  {path: 'admin/sua-voucher', component: EditVoucherComponent},
  {path: 'degiay', component: DegiayComponent},
  {path: 'chatlieu', component: ChatlieuComponent},
  {path: 'mausac', component: MausacComponent},
  {path: 'kichco', component: KichcoComponent},
  {path: 'thuonghieu', component: ThuonghieuComponent},
  {path: 'admin/danh-muc', component: DanhmucComponent},
  {path: 'admin/san-pham', component: SanphamComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
