import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import 'zone.js/dist/zone';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from '../app/component/home/home.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {LoginComponent} from './component/login/login.component';
import {GiohangComponent} from './component/giohang/giohang.component';
import {HttpClientModule} from '@angular/common/http';
import { DetailsComponent } from './component/details/details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    GiohangComponent,
    DetailsComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
