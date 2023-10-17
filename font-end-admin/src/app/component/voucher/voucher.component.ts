import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActionVoucherComponent} from "./action-voucher/action-voucher.component";

@Component({
  selector: 'app-bangvoucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private  matDialog: MatDialog) {
    this.columnDefs = [
      {headerName: 'Mã', field: 'Ma', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true},
      {headerName: 'Nội dung', field: 'NoiDung', sortable: true, filter: true},
      {headerName: 'Ngày bắt đầu', field: 'NgayBatDau', sortable: true, filter: true},
      {headerName: 'Ngày kết thúc', field: 'NgayKetThuc', sortable: true, filter: true},
      {headerName: 'Điều kiện sử dụng', field: 'DieuKienSD', sortable: true, filter: true},
      {headerName: 'Giá trị giảm', field: 'GiaTriGiam', sortable: true, filter: true},
      {headerName: 'Mô tả', field: 'MoTa', sortable: true, filter: true},
      {headerName: 'Trạng thái', field: 'TrangThai', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.rowData = [
      { Ma: 'KM1', NoiDung: 'Giảm giá 30%', NgayBatDau : '12/12/2023', NgayKetThuc : '13/12/2023' ,
        TrangThai : 'Còn hạn' , DieuKienSD : 'Hóa đơn trên 300k'  , GiaTriGiam : '20000', MoTa : 'Hóa đơn trên 300k được áp dụng'},
      { Ma: 'KM2', NoiDung: 'Giảm giá 30%', NgayBatDau : '12/12/2023', NgayKetThuc : '13/12/2023' ,
        TrangThai : 'Còn hạn' , DieuKienSD : 'Hóa đơn trên 300k'  , GiaTriGiam : '20000', MoTa : 'Hóa đơn trên 300k được áp dụng'},
      { Ma: 'KM3', NoiDung: 'Giảm giá 30%', NgayBatDau : '12/12/2023', NgayKetThuc : '13/12/2023' ,
        TrangThai : 'Còn hạn' , DieuKienSD : 'Hóa đơn trên 300k'  , GiaTriGiam : '20000', MoTa : 'Hóa đơn trên 300k được áp dụng'},
    ];
  }

}
