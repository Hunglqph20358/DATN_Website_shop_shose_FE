import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-creat-discount',
  templateUrl: './creat-discount.component.html',
  styleUrls: ['./creat-discount.component.css']
})
export class CreatDiscountComponent implements OnInit {

  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  constructor() {
    this.columnDefs = [
      {headerName: 'Mã sản phẩm', field: 'Ma', sortable: true, filter: true, checkboxSelection: true,
        headerCheckboxSelection: true, editable: true },
      {headerName: 'Tên sản phẩm', field: 'TenSP', sortable: true, filter: true, editable: true },
      {headerName: 'Tên thương hiệu', field: 'TenTH', sortable: true, filter: true, editable: true },
      {headerName: 'Loại', field: 'Loai', sortable: true, filter: true, editable: true },
      {headerName: 'Số lượt bán', field: 'SoLuot', sortable: true, filter: true, editable: true },
    ];
  }


  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  ngOnInit(): void {
    this.rowData = [
      {
        Ma: 'SP1',
        TenSP: 'AF1',
        TenTH: 'Nike',
        Loai : 'Chạy bộ',
        SoLuot: 2000
      },
      {
        Ma: 'SP2',
        TenSP: 'AF1',
        TenTH: 'Nike',
        Loai : 'Chạy bộ',
        SoLuot: 2000
      },
    ];
  }

}
