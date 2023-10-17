import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {DiscountComponent} from './component/discount/discount.component';
import {VoucherComponent} from './component/voucher/voucher.component';
import {AgGridModule} from 'ag-grid-angular';
import {HomeComponent} from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { CreatDiscountComponent } from './component/discount/creat-discount/creat-discount.component';
import { ActionDiscountComponent } from './component/discount/action-discount/action-discount.component';
import { CreatVoucherComponent } from './component/voucher/creat-voucher/creat-voucher.component';
import { ActionVoucherComponent } from './component/voucher/action-voucher/action-voucher.component';
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { EditDiscountComponent } from './component/discount/edit-discount/edit-discount.component';
import { EditVoucherComponent } from './component/voucher/edit-voucher/edit-voucher.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
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
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
