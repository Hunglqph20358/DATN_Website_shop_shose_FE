import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemSanPhamComponent} from "./them-san-pham/them-san-pham.component";
import {SuaSanPhamComponent} from "./sua-san-pham/sua-san-pham.component";

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemSanPhamComponent, {
      width: '60vh',
      height: '80vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaSanPhamComponent, {
      width: '60vh',
      height: '80vh'
    });
  }
}
