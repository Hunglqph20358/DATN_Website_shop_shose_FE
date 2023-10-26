import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {GiohangComponent} from './component/giohang/giohang.component';
import {DetailsComponent} from './component/details/details.component';
import {SanphamComponent} from './component/sanpham/sanpham.component';
import {CookieService} from 'ngx-cookie-service';
import {CheckoutComponent} from './component/checkout/checkout.component';

import {LoginComponent} from './component/login/login.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shopping-cart', component: GiohangComponent},
  { path: 'product-details/:idProduct', component: DetailsComponent},
  { path: 'sanpham', component: SanphamComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'cart/checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CookieService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
