import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemKichCoComponent} from "./them-kich-co/them-kich-co.component";
import {SuaKichCoComponent} from "./sua-kich-co/sua-kich-co.component";
import {SizeService} from "../../service/size.service";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-kichco',
  templateUrl: './kichco.component.html',
  styleUrls: ['./kichco.component.css']
})
export class KichcoComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private szsv: SizeService) {
    this.columnDefs = [
      {
        headerName: 'SizeNumber',
        field: 'sizeNumber',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {headerName: 'createDate', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Status', field: 'status', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.szsv.getAllSize().subscribe(result => {
      this.rowData = result;
    });
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
