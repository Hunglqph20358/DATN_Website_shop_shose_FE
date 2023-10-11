import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {ThemgiamgiaComponent} from "./component/themgiamgia/themgiamgia.component";
import {ThemvoucherComponent} from "./component/themvoucher/themvoucher.component";
import {BanggiamgiaComponent} from "./component/banggiamgia/banggiamgia.component";
import {BangvoucherComponent} from "./component/bangvoucher/bangvoucher.component";


const routes: Routes = [
  {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  {path: 'admin/dashboard', component: HomeComponent},
  {path: 'admin/don-hang', component: HomeComponent},
  {path: 'admin/them-giam-gia', component: ThemgiamgiaComponent},
  {path: 'admin/them-voucher', component: ThemvoucherComponent},
  {path: 'admin/bang-giam-gia', component: BanggiamgiaComponent},
  {path: 'admin/bang-voucher', component: BangvoucherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
