import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {DegiayComponent} from './component/degiay/degiay.component';
import { ChatlieuComponent } from './component/chatlieu/chatlieu.component';
import { MausacComponent } from './component/mausac/mausac.component';
import { KichcoComponent } from './component/kichco/kichco.component';
import { ThuonghieuComponent } from './component/thuonghieu/thuonghieu.component';
import { ThemChatLieuComponent } from './component/chatlieu/them-chat-lieu/them-chat-lieu.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


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
    ThemChatLieuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
