import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionDiscountComponent } from './action-discount/action-discount.component';
import { Router } from '@angular/router';
import { DiscountService } from '../../service/discount.service';

@Component({
  selector: 'app-banggiamgia',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  rowData: any = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;

  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng

  constructor(private apiService: DiscountService) {
    this.columnDefs = [
      {
        headerName: 'Mã',
        field: 'discountAdminDTO.code',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Tên',
        field: 'discountAdminDTO.name',
        sortable: true,
        filter: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Sản phẩm',
        field: 'productDTO.name',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'discountAdminDTO.startDate',
        sortable: true,
        filter: true,
        minWidth: 80,
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'discountAdminDTO.endDate',
        sortable: true,
        filter: true,
        minWidth: 80,
      },
      {
        headerName: 'Loại giảm giá',
        field: 'discountType',
        sortable: true,
        filter: true,
        cellRenderer: this.statusType.bind(this),
      },
      {
        headerName: 'Giá trị giảm',
        field: 'reducedValue',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: this.statusRenderer.bind(this),
      },
      {
        headerName: 'Action',
        field: '',
        cellRendererFramework: ActionDiscountComponent,
        pinned: 'right',
      },
    ];
  }

  // Định nghĩa Cell Renderer ở mức lớp
  statusRenderer(params) {
    if (params.value == 0) {
      return 'Còn hạn';
    } else if (params.value == 1) {
      return 'Hết hạn';
    } else {
      return 'Không rõ';
    }
  }
  statusType(params) {
    if (params.value == 1) {
      return 'Theo %';
    } else if (params.value == 0) {
      return 'Theo tiền';
    } else {
      return 'Không rõ';
    }
  }

  ngOnInit(): void {
    this.apiService.getSomeData().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
  }
}
