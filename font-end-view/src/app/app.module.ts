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
import {DetailsComponent} from './component/details/details.component';
import {CheckoutComponent} from './component/checkout/checkout.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {DetailCheckoutComponent} from './component/checkout/detail-checkout/detail-checkout.component';
import {PopupVoucherComponent} from './component/checkout/popup-voucher/popup-voucher.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AddressCheckoutComponent} from './component/checkout/address-checkout/address-checkout.component';
import {UpdateAddressComponent} from './component/checkout/address-checkout/update-address/update-address.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderComponent} from './component/order/order.component';
import {AgGridModule} from 'ag-grid-angular';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {OrderDetailComponent} from './component/order/order-detail/order-detail.component';
import {ToastrModule} from 'ngx-toastr';
import { ActionOrderComponent } from './component/order/action-order/action-order.component';
import { OrderNotLoginComponent } from './component/order-not-login/order-not-login.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { InfoUserComponent } from './component/info-user/info-user.component';
import {MatTableModule} from '@angular/material/table';

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
    DetailCheckoutComponent,
    PopupVoucherComponent,
    AddressCheckoutComponent,
    UpdateAddressComponent,
    OrderComponent,
    SignUpComponent,
    OrderDetailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InfoUserComponent,
    ActionOrderComponent,
    OrderNotLoginComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgSelectModule,
        FormsModule,
        MatCheckboxModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        AgGridModule.withComponents([]),
        ToastrModule.forRoot(),
        MatTabsModule,
        MatTableModule
    ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
