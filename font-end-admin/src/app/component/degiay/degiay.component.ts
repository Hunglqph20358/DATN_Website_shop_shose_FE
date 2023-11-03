import {Component, OnInit} from '@angular/core';
import {ThemChatLieuComponent} from "../chatlieu/them-chat-lieu/them-chat-lieu.component";
import {SuaChatLieuComponent} from "../chatlieu/sua-chat-lieu/sua-chat-lieu.component";
import {MatDialog} from "@angular/material/dialog";
import {ThemDeGiayComponent} from "./them-de-giay/them-de-giay.component";
import {SuaDeGiayComponent} from "./sua-de-giay/sua-de-giay.component";
import {SoleService} from "../../service/sole.service";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-degiay',
  templateUrl: './degiay.component.html',
  styleUrls: ['./degiay.component.css']
})
export class DegiayComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private slsv: SoleService) {
    this.columnDefs = [
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {headerName: 'Ngày bắt đầu', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Ngày Sửa ', field: 'updateDate', sortable: true, filter: true},
      {headerName: 'Trạng thái', field: 'status', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.slsv.getAllSole().subscribe(result => {
      this.rowData = result;
    });
  }

  openAdd() {
    this.matdialog.open(ThemDeGiayComponent, {
      width: '65vh',
      height: '75vh'
    });
  }

  openUpdate() {
    this.matdialog.open(SuaDeGiayComponent, {
      width: '65vh',
      height: '75vh'
    });
  }
}
