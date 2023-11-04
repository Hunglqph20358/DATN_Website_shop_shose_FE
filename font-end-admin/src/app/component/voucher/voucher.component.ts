import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionVoucherComponent } from './action-voucher/action-voucher.component';
import { VoucherService } from 'src/app/service/voucher.service';

@Component({
  selector: 'app-bangvoucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(
    private matDialog: MatDialog,
    private apiService: VoucherService
  ) {
    this.columnDefs = [
      {
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'startDate',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'endDate',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Điều kiện sử dụng',
        field: 'conditionApply',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Loại voucher',
        field: 'voucherType',
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
        headerName: 'Nội dung',
        field: 'description',
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
        headerName: 'Số lượng',
        field: 'quantity',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Action',
        field: '',
        cellRendererFramework: ActionVoucherComponent,
        pinned: 'right',
      },
    ];
  }

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
