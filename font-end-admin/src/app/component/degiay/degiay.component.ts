import { Component, OnInit } from '@angular/core';
import {ThemChatLieuComponent} from "../chatlieu/them-chat-lieu/them-chat-lieu.component";
import {SuaChatLieuComponent} from "../chatlieu/sua-chat-lieu/sua-chat-lieu.component";
import {MatDialog} from "@angular/material/dialog";
import {ThemDeGiayComponent} from "./them-de-giay/them-de-giay.component";
import {SuaDeGiayComponent} from "./sua-de-giay/sua-de-giay.component";

@Component({
  selector: 'app-degiay',
  templateUrl: './degiay.component.html',
  styleUrls: ['./degiay.component.css']
})
export class DegiayComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemDeGiayComponent, {
      width: '65vh',
      height: '75vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaDeGiayComponent, {
      width: '65vh',
      height: '75vh'
    });
  }
}
