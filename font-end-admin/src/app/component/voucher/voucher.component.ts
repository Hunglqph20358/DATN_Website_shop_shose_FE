import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionVoucherComponent } from './action-voucher/action-voucher.component';
import { VoucherService } from 'src/app/service/voucher.service';
import {formatDateTime} from '../../util/util';


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
  startDate = '';
  endDate = '';
  searchResults: any[] = [];
  isValidDateRange = () => {
    return (
      this.startDate &&
      this.endDate &&
      new Date(this.startDate) < new Date(this.endDate)
    );
  }
  constructor(
    private matDialog: MatDialog,
    private apiService: VoucherService,
    private cdr: ChangeDetectorRef
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
          return `<div>
      <label class="switch1">
        <input type="checkbox" ${params.data.idel === 1 ? 'checked' : ''  }>
        <span class="slider round"></span>
      </label>
    </div>`;
        },
        onCellClicked: (params) => {
          // Use params.node.data to access the data property
          return this.checkIsdell(params.node.data);
        }
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
  }
  checkIsdell(data: any) {
    console.log('ID to be sent:', data.id);

    // Truyền dữ liệu thông qua HTTP PUT request
    this.apiService.KichHoat(data.id).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.rowData = response;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error in HTTP PUT request:', error);
      }
    );
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
}
