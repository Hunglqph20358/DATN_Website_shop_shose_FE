import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderDetailService} from '../../../service/order-detail.service';
import {formatMoney, formatNumber, padZero} from '../../../util/util';
import Swal from 'sweetalert2';
import {OrderService} from '../../../service/order.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  rowData: any;
  columnDefs: any;
  gridApi;
  gridColumnApi;
  status: any;
  totalQuantity: number = 0;

  constructor(private orderDetailService: OrderDetailService,
              public matRef: MatDialogRef<OrderDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService, private cdr: ChangeDetectorRef, private toastr: ToastrService) {
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
    this.status = this.data.data.status;
  }

  ngOnInit(): void {
    // console.log(this.data);
    console.log(this.data.data);
    this.orderDetailService.getAllOrderDetailByOrder(this.data.data.id).subscribe(res => {
      this.rowData = res;
      this.totalQuantity = this.rowData.reduce((total, orderDetail) => total + (orderDetail.quantity || 0), 0);
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  cancelOrder() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng này không ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.data.id,
          idCustomer: this.data.customer.id
        };
        this.orderService.cancelOrderView(obj).subscribe(res => {
          this.toastr.success('Hủy đơn hàng Thanh Cong!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.cdr.detectChanges();
          this.matRef.close('update-order');
        });
      }
    });
  }
}
