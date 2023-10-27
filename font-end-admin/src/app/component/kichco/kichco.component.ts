import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemDeGiayComponent} from "../degiay/them-de-giay/them-de-giay.component";
import {SuaDeGiayComponent} from "../degiay/sua-de-giay/sua-de-giay.component";
import {ThemKichCoComponent} from "./them-kich-co/them-kich-co.component";
import {SuaKichCoComponent} from "./sua-kich-co/sua-kich-co.component";

@Component({
  selector: 'app-kichco',
  templateUrl: './kichco.component.html',
  styleUrls: ['./kichco.component.css']
})
export class KichcoComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemKichCoComponent, {
      width: '65vh',
      height: '50vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaKichCoComponent, {
      width: '65vh',
      height: '50vh'
    });
  }

}
