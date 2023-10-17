import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActionDiscountComponent} from "./action-discount/action-discount.component";
import {CreatDiscountComponent} from "./creat-discount/creat-discount.component";

@Component({
  selector: 'app-banggiamgia',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matDialog: MatDialog) {
    this.columnDefs = [
      { headerName: 'Mã' , field: 'Ma', sortable: true, filter: true , checkboxSelection: true , minWidth: 70, maxWidth : 80},
      { headerName: 'Tên' , field: 'Ten', sortable: true, filter: true },
      { headerName: 'Nội dung' , field: 'NoiDung', sortable: true, filter: true },
      { headerName: 'Ngày bắt đầu', field: 'NgayBatDau' , sortable: true, filter: true , minWidth : 80 },
      { headerName: 'Ngày kết thúc', field: 'NgayKetThuc' , sortable: true, filter: true ,  minWidth : 80},
      { headerName: 'Trạng thái', field: 'TrangThai' , sortable: true, filter: true },
      { headerName: 'Tên sản phẩm', field: 'TenSP' ,  sortable: true, filter: true },
      { headerName: 'Loại giảm giá', field: 'LoaiGiamGia' ,  sortable: true, filter: true },
      { headerName: 'Giá trị giảm', field: 'GiaTriGiam' , sortable: true, filter: true },
      {headerName: 'Action', field: '', cellRendererFramework: ActionDiscountComponent},
    ];
  }

  ngOnInit(): void {
    this.rowData = [
      { Ma: 'KM1', Ten: 'Haha', NoiDung: 'Giảm giá 30%', NgayBatDau : '12/12/2023', NgayKetThuc : '13/12/2023' ,
      TrangThai : 'Còn hạn' , TenSP : 'AF1 Full White' , LoaiGiamGia : '%' , GiaTriGiam : '20000'},
      { Ma: 'KM2', Ten: 'Haha', NoiDung: 'Giảm giá 30%', NgayBatDau : '12/12/2023', NgayKetThuc : '13/12/2023' ,
        TrangThai : 'Còn hạn' , TenSP : 'AF1 Full White' , LoaiGiamGia : '%' , GiaTriGiam : '20000'},
    ];
  }

  openAdd(){
    this.matDialog.open(CreatDiscountComponent, {
      width: '90vh',
      height: '90vh',
      data: null
    });
  }
  // Hard-code dữ liệu hiển thị cho grid


}
