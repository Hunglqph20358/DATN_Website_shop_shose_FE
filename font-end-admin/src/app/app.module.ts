import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgGridModule} from "ag-grid-angular";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { ThemgiamgiaComponent } from './component/themgiamgia/themgiamgia.component';
import { ThemvoucherComponent } from './component/themvoucher/themvoucher.component';
import { BanggiamgiaComponent } from './component/banggiamgia/banggiamgia.component';
import { BangvoucherComponent } from './component/bangvoucher/bangvoucher.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ThemgiamgiaComponent,
    ThemvoucherComponent,
    BanggiamgiaComponent,
    BangvoucherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
