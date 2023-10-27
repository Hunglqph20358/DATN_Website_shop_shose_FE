import { Component, OnInit } from '@angular/core';
import {ThemDanhMucComponent} from "../danhmuc/them-danh-muc/them-danh-muc.component";
import {SuaDanhMucComponent} from "../danhmuc/sua-danh-muc/sua-danh-muc.component";
import {MatDialog} from "@angular/material/dialog";
import {ThemThuongHieuComponent} from "./them-thuong-hieu/them-thuong-hieu.component";
import {SuaThuongHieuComponent} from "./sua-thuong-hieu/sua-thuong-hieu.component";

@Component({
  selector: 'app-thuonghieu',
  templateUrl: './thuonghieu.component.html',
  styleUrls: ['./thuonghieu.component.css']
})
export class ThuonghieuComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemThuongHieuComponent, {
      width: '60vh',
      height: '60vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaThuongHieuComponent, {
      width: '60vh',
      height: '60vh'
    });
  }
}
