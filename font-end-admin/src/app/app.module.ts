import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {DegiayComponent} from './component/degiay/degiay.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChangeDetectorRef, NgModule } from '@angular/core';
import { ChatlieuComponent } from './component/chatlieu/chatlieu.component';
import { MausacComponent } from './component/mausac/mausac.component';
import { KichcoComponent } from './component/kichco/kichco.component';
import { ThuonghieuComponent } from './component/thuonghieu/thuonghieu.component';
import { ThemChatLieuComponent } from './component/chatlieu/them-chat-lieu/them-chat-lieu.component';

import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DiscountComponent } from './component/discount/discount.component';
import { VoucherComponent } from './component/voucher/voucher.component';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatDiscountComponent } from './component/discount/creat-discount/creat-discount.component';
import { ActionDiscountComponent } from './component/discount/action-discount/action-discount.component';
import { CreatVoucherComponent } from './component/voucher/creat-voucher/creat-voucher.component';
import { ActionVoucherComponent } from './component/voucher/action-voucher/action-voucher.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditDiscountComponent } from './component/discount/edit-discount/edit-discount.component';
import { EditVoucherComponent } from './component/voucher/edit-voucher/edit-voucher.component';
import { OrderComponent } from './component/order/order.component';
import { OderProcessingComponent } from './component/oder-processing/oder-processing.component';
import { StaffComponent } from './component/staff/staff.component';
import {LoginComponent} from './component/login/login.component';
import {JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { DanhmucComponent } from './component/danhmuc/danhmuc.component';
import { SanphamComponent } from './component/sanpham/sanpham.component';
import { SuaChatLieuComponent } from './component/chatlieu/sua-chat-lieu/sua-chat-lieu.component';
import { ThemDanhMucComponent } from './component/danhmuc/them-danh-muc/them-danh-muc.component';
import { SuaDanhMucComponent } from './component/danhmuc/sua-danh-muc/sua-danh-muc.component';
import { ThemDeGiayComponent } from './component/degiay/them-de-giay/them-de-giay.component';
import { SuaDeGiayComponent } from './component/degiay/sua-de-giay/sua-de-giay.component';
import { ThemKichCoComponent } from './component/kichco/them-kich-co/them-kich-co.component';
import { SuaKichCoComponent } from './component/kichco/sua-kich-co/sua-kich-co.component';
import { ThemMauSacComponent } from './component/mausac/them-mau-sac/them-mau-sac.component';
import { SuaMauSacComponent } from './component/mausac/sua-mau-sac/sua-mau-sac.component';
import { ThemThuongHieuComponent } from './component/thuonghieu/them-thuong-hieu/them-thuong-hieu.component';
import { SuaThuongHieuComponent } from './component/thuonghieu/sua-thuong-hieu/sua-thuong-hieu.component';
import { ThemSanPhamComponent } from './component/sanpham/them-san-pham/them-san-pham.component';
import { SuaSanPhamComponent } from './component/sanpham/sua-san-pham/sua-san-pham.component';
import { ActionRendererComponent } from './component/chatlieu/action-renderer/action-renderer.component';
import { ActionCategoryRedererComponent } from './component/danhmuc/action-category-rederer/action-category-rederer.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DetailDiscountComponent } from './component/discount/detail-discount/detail-discount.component';
import { DetailVoucherComponent } from './component/voucher/detail-voucher/detail-voucher.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ActionOrderComponent } from './component/order/action-order/action-order.component';
import { OrderDetailComponent } from './component/order/order-detail/order-detail.component';
import {NgSelectModule} from '@ng-select/ng-select';

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
    OrderComponent,
    OderProcessingComponent,
    StaffComponent,
    LoginComponent,
    DanhmucComponent,
    SanphamComponent,
    SuaChatLieuComponent,
    ThemDanhMucComponent,
    SuaDanhMucComponent,
    ThemDeGiayComponent,
    SuaDeGiayComponent,
    ThemKichCoComponent,
    SuaKichCoComponent,
    ThemMauSacComponent,
    SuaMauSacComponent,
    ThemThuongHieuComponent,
    SuaThuongHieuComponent,
    ThemSanPhamComponent,
    SuaSanPhamComponent,
    ActionRendererComponent,
    ActionCategoryRedererComponent,
    DetailDiscountComponent,
    DetailVoucherComponent,
    SignUpComponent,
    ActionOrderComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    NgSelectModule,
  ],
  bootstrap: [AppComponent],
  providers: [ { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  entryComponents: [ActionRendererComponent]
})
export class AppModule {
}
