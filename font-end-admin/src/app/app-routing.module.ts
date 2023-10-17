import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DiscountComponent} from "./component/discount/discount.component";
import {VoucherComponent} from "./component/voucher/voucher.component";
import {CreatDiscountComponent} from "./component/discount/creat-discount/creat-discount.component";
import {CreatVoucherComponent} from "./component/voucher/creat-voucher/creat-voucher.component";
import {EditDiscountComponent} from "./component/discount/edit-discount/edit-discount.component";
import {EditVoucherComponent} from "./component/voucher/edit-voucher/edit-voucher.component";


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
