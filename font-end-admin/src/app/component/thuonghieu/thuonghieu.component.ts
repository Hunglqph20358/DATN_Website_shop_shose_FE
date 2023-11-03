import { Component, OnInit } from '@angular/core';
import {ThemDanhMucComponent} from "../danhmuc/them-danh-muc/them-danh-muc.component";
import {SuaDanhMucComponent} from "../danhmuc/sua-danh-muc/sua-danh-muc.component";
import {MatDialog} from "@angular/material/dialog";
import {ThemThuongHieuComponent} from "./them-thuong-hieu/them-thuong-hieu.component";
import {SuaThuongHieuComponent} from "./sua-thuong-hieu/sua-thuong-hieu.component";
import {BrandService} from "../../service/brand.service";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-thuonghieu',
  templateUrl: './thuonghieu.component.html',
  styleUrls: ['./thuonghieu.component.css']
})
export class ThuonghieuComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private brsv: BrandService) {
    this.columnDefs = [
      {
        headerName: 'BrandName',
        field: 'name',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {headerName: 'Create Date', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Update Date ', field: 'updateDate', sortable: true, filter: true},
      {headerName: 'Status', field: 'status', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.brsv.getAllBrand().subscribe(res => {
      this.rowData = res;
    });
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
