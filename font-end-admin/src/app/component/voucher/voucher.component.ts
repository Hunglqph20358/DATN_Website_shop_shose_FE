import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionVoucherComponent } from './action-voucher/action-voucher.component';
import { VoucherService } from 'src/app/service/voucher.service';
import {formatDate, formatDateTime, formatDateYYYY_MM_dd} from '../../util/util';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-bangvoucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css'],
})
export class VoucherComponent implements OnInit {
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  rowData = [];
  rowData1 = [];
  rowData2 = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  loc = '0';
  idStaff = '';
  role: '';
  dateFromCurrent = null;
  dateToCurrent = null;
  searchResults: any[] = [];
  constructor(
    private matDialog: MatDialog,
    private apiService: VoucherService,
    private cdr: ChangeDetectorRef,
    private  toastr: ToastrService
  ) {
    const currentDate = new Date();
    this.dateFromCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.dateToCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.columnDefs = [
      {
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Tên',
        field: 'name',
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
        headerName: 'Sử dụng',
        valueGetter(params) {
          const useVoucher = params.data.useVoucher || 0;
          const quantity = params.data.quantity || 1;
          return `${useVoucher} / ${quantity}`;
        }
      },
      {
        headerName: 'Hiển thị',
        field: '',
        cellRenderer: (params) => {
          const isChecked = params.data.idel === 1;
          return `<div>
      <label class="switch1">
        <input type="checkbox" ${isChecked ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>`;
        },
        onCellClicked: (params) => {
          const useVoucher = params.data.useVoucher || 0;
          const quantity = params.data.quantity || 1;
          // Bỏ kiểm tra idell nếu usecount bằng quantity
          if (useVoucher === quantity) {
            return;
          }

          // Ngược lại, kiểm tra idell bình thường
          this.checkIsdell(params.node.data, params.node.index);
        }
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
        headerName: 'Action',
        field: '',
        cellRendererFramework: ActionVoucherComponent,
        pinned: 'right',
      },
    ];
  }

  statusRenderer(params) {
    if (params.value === 0) {
      return 'Còn hạn';
    } else if (params.value === 1) {
      return 'Hết hạn';
    } else {
      return 'Không rõ';
    }
  }
    statusType(params) {
      if (params.value === 0) {
        return 'Theo %';
      } else if (params.value === 1) {
        return 'Theo tiền';
      } else {
        return 'Không rõ';
      }
  }

  ngOnInit(): void {
    this.apiService.getSomeData().subscribe((response) => {
      this.rowData = response;
      this.searchResults = response;
      console.log(response);
    });
    this.apiService.getVoucherKH().subscribe((response) => {
      this.rowData1 = response;
    });
    this.apiService.getVoucherKKH().subscribe((response) => {
      this.rowData2 = response;
      console.log(response);
    });
    this.role = JSON.parse(localStorage.getItem('role'));
  }
  checkIsdell(data: any, index: any) {
    console.log(data, index);
    if (data.idel === 0) {
      const userConfirmed = confirm('Bạn có muốn kích hoạt voucher không?');
      if (!userConfirmed) {
        return;
      }
      // Truyền dữ liệu thông qua HTTP PUT request
      this.apiService.KichHoat(data.id).subscribe(
        (res) => {
          this.rowData[index].idel = res.data.idel;
          this.cdr.detectChanges();
          this.toastr.success('Kích hoạt thành công');
          this.apiService.sendEmail(res).subscribe(
            response => console.log('sendEmail response:', response),
            error => console.error('sendEmail error:', error)
          );
        },
        error => {
          this.toastr.error('Kích hoạt thất bại');
        });
    } else {
      const userConfirmed = confirm('Bạn có muốn hủy bỏ kích hoạt voucher  không?');
      if (!userConfirmed) {
        return;
      }
      // Truyền dữ liệu thông qua HTTP PUT request
      this.apiService.KichHoat(data.id).subscribe(res => {
          this.toastr.success('Hủy bỏ kích hoạt thành công');
        },
        error => {
          this.toastr.error('Hủy bỏ kích hoạt thất bại');
        });
    }
    this.cdr.detectChanges();
  }
  searchByCustomer(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByCustomer(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.cdr.detectChanges();
  }
  searchByVoucher(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByVoucher(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
    this.cdr.detectChanges();
  }
  searchByDate(obj) {
    const dateRange = {
      fromDate: obj.dateFrom,
      toDate: obj.dateTo
    };

    this.apiService.searchByDate(dateRange).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error('Error occurred during date range search:', error);
        // You can provide a user-friendly error message here if needed
      }
    );
    this.cdr.detectChanges();
  }
  getDater(data) {
    console.log(data);
    if (data.startDate && data.endDate){
      this.dateFromCurrent = data.startDate;
      this.dateToCurrent = data.endDate;
      const obj = {
        dateFrom: formatDate(this.dateFromCurrent),
        dateTo: formatDate(this.dateToCurrent)
      };
      this.searchByDate(obj);
    }else {
      this.ngOnInit();
    }
  }
}
