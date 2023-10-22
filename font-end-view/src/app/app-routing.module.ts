import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {GiohangComponent} from './component/giohang/giohang.component';
import {DetailsComponent} from './component/details/details.component';
import {CookieService} from 'ngx-cookie-service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shopping-cart', component: GiohangComponent},
  { path: 'product-details/:idProduct', component: DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CookieService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
