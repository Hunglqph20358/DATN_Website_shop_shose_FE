import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemChatLieuComponent} from "./them-chat-lieu/them-chat-lieu.component";
import {SuaChatLieuComponent} from "./sua-chat-lieu/sua-chat-lieu.component";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-chatlieu',
  templateUrl: './chatlieu.component.html',
  styleUrls: ['./chatlieu.component.css']
})
export class ChatlieuComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog) {
    this.columnDefs = [
      {headerName: 'Tên', field: 'name', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true},
      {headerName: 'Ngày bắt đầu', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Ngày Sửa ', field: 'update_date', sortable: true, filter: true},
      {headerName: 'Mô tả', field: 'description', sortable: true, filter: true},
      {headerName: 'Trạng thái', field: 'status', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.rowData =  []
  }

  openAdd(){
    this.matdialog.open(ThemChatLieuComponent, {
      width: '65vh',
      height: '65vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaChatLieuComponent, {
      width: '65vh',
      height: '65vh'
    });
  }
}
