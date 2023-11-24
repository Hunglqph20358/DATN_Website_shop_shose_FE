import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {VoucherService} from "../../service/voucher.service";
import {formatDateTime} from "../../util/util";
import {ShowComponent} from "../discount/show/show.component";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-voucher-ship',
  templateUrl: './voucher-ship.component.html',
  styleUrls: ['./voucher-ship.component.css']
})
export class VoucherShipComponent implements OnInit {
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
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'startDate',
        sortable: true,
        filter: true,
        valueGetter: params => {
          return `${formatDateTime(params.data.startDate)}`;
        }
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'endDate',
        sortable: true,
        filter: true,
        valueGetter: params => {
          return `${formatDateTime(params.data.endDate)}`;
        }
      },
      {
        headerName: 'Điều kiện sử dụng',
        field: 'conditions',
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
        headerName: 'Sử dụng',
        valueGetter : function (params) {
          const useVoucher = params.data.useVoucher || 0;
          const quantity = params.data.quantity || 1;
          return `${useVoucher} / ${quantity}`;
        }
      },
      {
        headerName: 'Hiển thị',
        field: '',
        cellRendererFramework: ShowComponent,
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
    if (params.value == 0) {
      return 'Theo %';
    } else if (params.value == 1) {
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

