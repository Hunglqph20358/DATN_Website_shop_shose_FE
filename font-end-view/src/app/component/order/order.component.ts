import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listStatus: any = [];
  status = 6;
  rowData: any;
  columnDefs: any;
  headerHeight: 60;
  rowHeight: 45;
  gridApi;
  gridColumnApi;

  constructor() {
    const lst =
      [{name: 'Chờ xử lí', id: 0},
        {name: 'Chờ giao hàng', id: 1},
        {name: 'Đang giao hàng', id: 2},
        {name: 'Đã nhận hàng', id: 3},
        {name: 'Đã Hủy', id: 4},
        {name: 'Hoàn thành', id: 5},
        {name: 'Tất cả', id: 6}];
    this.listStatus = lst;

    this.columnDefs = [
      {
        headerName: 'STT',
        suppressMovable: true,
        valueGetter: param => {
          return param.node.rowIndex + 1;
        },
        minWidth: 60,
        maxWidth: 60,
      },
      {
        headerName: 'Mã đơn hàng',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
      },
      {
        headerName: 'Ngày Đặt Hàng',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
      }, {
        headerName: 'Tổng Tiền',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
      }, {
        headerName: 'Trạng Thái',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
      }, {
        headerName: '',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
      },
    ];
  }

  ngOnInit(): void {
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
