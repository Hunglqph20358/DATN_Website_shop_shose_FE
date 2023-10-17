import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css']
})
export class EditDiscountComponent implements OnInit {

  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  Ma = 'a' ;
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
