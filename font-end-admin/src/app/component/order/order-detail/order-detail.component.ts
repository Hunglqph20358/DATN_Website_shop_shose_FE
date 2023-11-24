import {Component, Inject, OnInit} from '@angular/core';
import {formatMoney, padZero} from '../../../util/util';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderDetailService} from '../../../service/order-detail.service';
import {OrderService} from '../../../service/order.service';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  rowData: any;
  columnDefs: any;
  gridApi;
  gridColumnApi;
  status: any;

  constructor(private orderDetailService: OrderDetailService, public matRef: MatDialogRef<OrderDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService, private toastr: ToastrService) {
    this.rowData = [];
    this.columnDefs = [
      {
        headerName: 'STT',
        field: '',
        suppressMovable: true,
        minWidth: 60,
        maxWidth: 60,
        valueGetter: param => {
          return param.node.rowIndex + 1;
        }
      },
      {
        headerName: 'Tên Sản phẩm',
        field: '',
        suppressMovable: true,
        cellRenderer: params => {
          return `<div>
        <img width="60px" height="60px" src="${params.data.productDetailDTO.productDTO.imagesDTOList[0].imageName}" alt="">
        <span class="productName" title="${params.data.productDetailDTO.productDTO.name}">${params.data.productDetailDTO.productDTO.name}</span>
</div>`;
        },
      },
      {
        headerName: 'Phân Loại',
        field: '',
        suppressMovable: true,
        cellRenderer: params => {
          return `<div style="height: 30px"><span style="font-weight: bold">Color:</span> ${params.data.productDetailDTO.colorDTO.name}</div>
            <div style="height: 30px"><span style="font-weight: bold">Size: </span> ${params.data.productDetailDTO.sizeDTO.sizeNumber}</div>`;
        }
      },
      {
        headerName: 'Số lượng',
        field: 'quantity',
        suppressMovable: true,
        valueFormatter: params => {
          return padZero(params.data.quantity);
        },
      },
      {
        headerName: 'Gía tiền',
        field: 'price',
        suppressMovable: true,
        valueFormatter: params => {
          return formatMoney(params.data.price);
        },
      },
      {
        headerName: 'Thành tiền',
        field: '',
        suppressMovable: true,
        valueFormatter: params => {
          return formatMoney(params.data.price * params.data.quantity);
        },
      }
    ];
    this.status = this.data.status;
  }

  ngOnInit(): void {
    // console.log(this.data);
    this.orderDetailService.getAllOrderDetailByOrder(this.data.id).subscribe(res => {
      this.rowData = res;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  cancelOrder() {
    // @ts-ignore
    Swal.fire({
      title: 'Bạn có chắc chắn muốn Hoàn hủy hóa đơn này không ?',
      icon: 'waring',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.id,
          idStaff: 3
        };
        this.orderService.cancelOrder(obj).subscribe(res => {
          if (res.status === 'OK') {
            this.toastr.success('Xoa Thanh Cong!', 'Remove', {
              positionClass: 'toast-top-right'
            });
          }
        });
      }
    });
  }
}
