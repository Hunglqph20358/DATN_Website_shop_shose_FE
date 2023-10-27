import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemDanhMucComponent} from "./them-danh-muc/them-danh-muc.component";
import {SuaDanhMucComponent} from "./sua-danh-muc/sua-danh-muc.component";

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemDanhMucComponent, {
      width: '60vh',
      height: '60vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaDanhMucComponent, {
      width: '60vh',
      height: '60vh'
    });
  }
}
