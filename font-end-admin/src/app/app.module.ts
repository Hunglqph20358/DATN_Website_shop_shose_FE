import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

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
import {MatDialogModule} from '@angular/material/dialog';
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
    SuaSanPhamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
