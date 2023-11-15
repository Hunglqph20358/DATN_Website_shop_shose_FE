import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {formatDateTime, formatMoney} from '../../util/util';
import {OrderService} from '../../service/order.service';
import {ActionOrderComponent} from './action-order/action-order.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listStatus: any = [];
  status = 6;
  rowData;
  columnDefs;
  gridApi;
  gridColumnApi;
  constructor(private orderService: OrderService, private cdr: ChangeDetectorRef) {
    const lst =
      [
        {name: 'Tất cả', id: 6},
        {name: 'Chờ xác nhận', id: 0},
        {name: 'Chờ xử lý', id: 1},
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
              return 'Chờ xác nhận';
            case 1:
              return 'Chờ xử lý';
            case 2:
              return 'Đang giao hàng';
            case 3:
              return 'Đã nhận hàng';
            case 4:
              return 'Đã Hủy';
            case 5:
              return 'Hoàn Thành';
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
        field: '',
        minWidth: 410,
        cellRendererFramework: ActionOrderComponent
      },
    ];
    this.rowData = [];
  }

  ngOnInit(): void {
   this.getAllOrder();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  getAllOrder(): void {
    this.orderService.getAllOrderAdmin(this.status).subscribe(res => {
      this.rowData = res;
      console.log(this.rowData);
    });
    this.cdr.detectChanges();
  }
}
