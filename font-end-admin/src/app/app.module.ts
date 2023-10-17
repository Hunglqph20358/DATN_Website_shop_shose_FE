import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {DegiayComponent} from './component/degiay/degiay.component';
import { ChatlieuComponent } from './component/chatlieu/chatlieu.component';
import { MausacComponent } from './component/mausac/mausac.component';
import { KichcoComponent } from './component/kichco/kichco.component';
import { ThuonghieuComponent } from './component/thuonghieu/thuonghieu.component';
import { ThemChatLieuComponent } from './component/chatlieu/them-chat-lieu/them-chat-lieu.component';

import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {DiscountComponent} from './component/discount/discount.component';
import {VoucherComponent} from './component/voucher/voucher.component';
import {AgGridModule} from 'ag-grid-angular';
import {HomeComponent} from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatDiscountComponent } from './component/discount/creat-discount/creat-discount.component';
import { ActionDiscountComponent } from './component/discount/action-discount/action-discount.component';
import { CreatVoucherComponent } from './component/voucher/creat-voucher/creat-voucher.component';
import { ActionVoucherComponent } from './component/voucher/action-voucher/action-voucher.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDiscountComponent } from './component/discount/edit-discount/edit-discount.component';
import { EditVoucherComponent } from './component/voucher/edit-voucher/edit-voucher.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DegiayComponent,
    ChatlieuComponent,
    MausacComponent,
    KichcoComponent,
    ThuonghieuComponent,
    ThemChatLieuComponent,
    DiscountComponent,
    VoucherComponent,
    HomeComponent,
    CreatDiscountComponent,
    ActionDiscountComponent,
    CreatVoucherComponent,
    ActionVoucherComponent,
    EditDiscountComponent,
    EditVoucherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
