import { Component, OnInit } from '@angular/core';
import {ColDef} from 'ag-grid-community';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  rowData = [];

  columnDefs: ColDef[] = [
    {headerName: 'Mã', field: 'Ma', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true, width: 150},
    {headerName: 'Tên Khách Hàng', field: 'TenKhachHang', sortable: true, filter: true},
    {headerName: 'Tổng Tiền', field: 'TongTien', sortable: true, filter: true},
    {headerName: 'Số Điện Thoại', field: 'SoDienThoai', sortable: true, filter: true},
    {headerName: 'Địa Chỉ', field: 'DiaChi', sortable: true, filter: true},
    {headerName: 'Mô tả', field: 'MoTa', sortable: true, filter: true},
    {headerName: 'Trạng thái', field: 'TrangThai', sortable: true, filter: true},
    {headerName: 'Action', field: ''},
  ];


  constructor() { }

  ngOnInit(): void {
    this.rowData = [
      { Ma: 'DH0001', TenKhachHang: 'Nguyễn Văn Mạnh', TongTien: '20000', NgayGiao : '12/12/2023', NgayNhan : '13/12/2023' ,
        TrangThai : 'Còn hạn' ,  SoDienThoai : '20000', DiaChi: 'Hà Nội', MoTa : 'màu Trắng'},
    ];
  }

}
