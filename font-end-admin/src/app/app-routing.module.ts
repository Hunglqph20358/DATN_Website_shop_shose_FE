import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {DegiayComponent} from './component/degiay/degiay.component';
import {ChatlieuComponent} from './component/chatlieu/chatlieu.component';
import {MausacComponent} from "./component/mausac/mausac.component";
import {KichcoComponent} from "./component/kichco/kichco.component";
import {ThuonghieuComponent} from "./component/thuonghieu/thuonghieu.component";

const routes: Routes = [
  {path: '', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  {path: 'admin/dashboard', component: HomeComponent},
  {path: 'admin/don-hang', component: HomeComponent},
  {path: 'degiay', component: DegiayComponent},
  {path: 'chatlieu', component: ChatlieuComponent},
  {path: 'mausac', component: MausacComponent},
  {path: 'kichco', component: KichcoComponent},
  {path: 'thuonghieu', component: ThuonghieuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
