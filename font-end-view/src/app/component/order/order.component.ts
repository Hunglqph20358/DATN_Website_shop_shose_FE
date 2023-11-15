import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {formatCurrency} from '@angular/common';
import {formatDate, formatDateTime, formatMoney, formatTime} from '../../util/util';
import {MatDialog} from '@angular/material/dialog';
import {OrderDetailComponent} from './order-detail/order-detail.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listStatus: any = [];
  status = 6;
  rowData: any;
  columnDefs: any;
  headerHeight: 80;
  rowHeight: 55;
  gridApi;
  gridColumnApi;

  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef, private matDialog: MatDialog) {
    const lst =
      [
        {name: 'Tất cả', id: 6},
        {name: 'Chờ xác nhận', id: 0},
        {name: 'Chờ xử lí', id: 1},
        {name: 'Đang giao hàng', id: 2},
        {name: 'Đã nhận hàng', id: 3},
        {name: 'Đã Hủy', id: 4},
        {name: 'Hoàn thành', id: 5},
      ];
    this.listStatus = lst;

    this.columnDefs = [
      {
        headerName: 'STT',
        field: '',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
        valueGetter: param => {
          return param.node.rowIndex + 1;
        },
      },
      {
        headerName: 'Mã đơn hàng',
        field: 'code',
        suppressMovable: true,
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          // top: '12px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          // textAlign: 'center',
          'justify-content': 'center',
        },
      },
      {
        headerName: 'Ngày Đặt Hàng',
        field: 'createDate',
        suppressMovable: true,
        valueFormatter: params => {
          return formatDateTime(params.data.createDate);
        },
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          // top: '12px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          // textAlign: 'center',
          'justify-content': 'center',
        },
      }, {
        headerName: 'Tổng Tiền',
        field: 'totalPayment',
        suppressMovable: true,
        valueFormatter: params => {
          return formatMoney(params.data.totalPayment);
        },
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          // top: '12px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          // textAlign: 'center',
          'justify-content': 'center',
        },
      }, {
        headerName: 'Trạng Thái',
        field: 'status',
        suppressMovable: true,
        valueGetter: (params) => {
          const status = params.data.status;
          switch (status) {
            case 0:
              return 'Chờ xử lý';
            case 1:
              return 'Chờ giao hàng';
            case 2:
              return 'Đang giao hàng';
            case 3:
              return 'Đã nhận hàng';
            case 4:
              return 'Đang giao hàng';
            case 5:
              return 'Đã Hủy';
            default:
              return 'Không xác định';
          }
        },
        cellStyle: {
          'font-weight': '500',
          'font-size': '12px',
          'align-items': 'center',
          color: '#101840',
          display: 'flex',
          // top: '12px',
          'white-space': 'nowrap',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          // textAlign: 'center',
          'justify-content': 'center',
        },
      }, {
        headerName: '',
        suppressMovable: true,
        cellRenderer: params => {
          return `<div style="text-decoration: none" class="btn btn-link">Xem Chi Tiết</div>`;
        },
        onCellClicked: (params) => {
          return this.openOrderDetail(params.data);
        }
      },
    ];
    this.rowData = [];
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(): void {
    const obj = {
      idCustomer: 3,
      status: this.status
    };
    this.orderService.getAllOrder(obj).subscribe(res => {
      this.rowData = res;
      console.log(this.rowData);
    });
    this.cdr.detectChanges();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  openOrderDetail(value: any): void {
    this.matDialog.open(OrderDetailComponent, {
      width: '150vh',
      data: value
    });
  }
}
