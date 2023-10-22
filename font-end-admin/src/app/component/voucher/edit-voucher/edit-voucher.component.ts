import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css']
})
export class EditVoucherComponent implements OnInit {

  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;

  constructor() {
    this.columnDefs = [
      {
        headerName: 'Mã khách hàng',
        field: 'Ma',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {headerName: 'Tên khách hàng', field: 'TenKK', sortable: true, filter: true},
      {headerName: 'Số lượt mua', field: 'SoLuot', sortable: true, filter: true},
    ];
  }

  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  ngOnInit(): void {
    this.rowData = [
      {
        Ma: 'KH1',
        TenKK: 'Xuân',
        SoLuot: '20'
      },
      {
        Ma: 'KH2',
        TenKK: 'Duy',
        SoLuot: '20'
      },
    ];
  }

}
