import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
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
  totalQuantity: number = 0;
  constructor(private orderDetailService: OrderDetailService, public matRef: MatDialogRef<OrderDetailComponent>,
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
          idStaff: this.data.staff.id
        };
        this.orderService.cancelOrder(obj).subscribe(res => {
          this.toastr.success('Hủy đơn hàng Thanh Cong!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.cdr.detectChanges();
          this.matRef.close('update-order');
        });
      }
    });
  }

  xacNhanOrder() {
    Swal.fire({
      title: 'Bạn có muốn xác nhận đơn hàng này không ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.data.id,
          idStaff: this.data.staff.id
        };
        this.orderService.progressingOrder(obj).subscribe(res => {
          this.toastr.success('Xác nhận thành công!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.cdr.detectChanges();
          this.matRef.close('update-order');
        });
      }
    });
  }

  giaoHangOrder() {
    Swal.fire({
      title: 'Bạn có muốn giao hàng đơn hàng này không ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.data.id,
          idStaff: this.data.staff.id
        };
        this.orderService.shipOrder(obj).subscribe(res => {
          this.toastr.success('Đơn hàng đang được giao!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.matRef.close('update-order');
        });
        this.cdr.detectChanges();
      }
    });
  }

  hoanThanhOrder() {
    Swal.fire({
      title: 'Bạn có muốn hoàn thành đơn hàng này không ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.data.id,
          idStaff: this.data.staff.id
        };
        this.orderService.completeOrder(obj).subscribe(res => {
          this.toastr.success('Đơn hàng đã hoàn thành!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.cdr.detectChanges();
          this.matRef.close('update-order');
        });
      }
    });
  }

  boLoOrder() {
    Swal.fire({
      title: 'Đơn hàng này có chắc chắn đã bỏ lỡ không ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          id: this.data.data.id,
          idStaff: this.data.staff.id
        };
        this.orderService.missedOrder(obj).subscribe(res => {
          this.toastr.success('Bỏ lỡ đơn hàng thành công!', 'Thông báo', {
            positionClass: 'toast-top-right'
          });
          this.cdr.detectChanges();
          this.matRef.close('update-order');
        });
      }
    });
  }
}
