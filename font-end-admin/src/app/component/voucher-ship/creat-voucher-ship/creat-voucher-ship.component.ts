import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VoucherShipService} from '../../../service/voucher-ship.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-creat-voucher-ship',
  templateUrl: './creat-voucher-ship.component.html',
  styleUrls: ['./creat-voucher-ship.component.css']
})
export class CreatVoucherShipComponent implements OnInit {

  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    conditions: '',
    quantity: '',
    customerAdminDTOList: '',
    limitCustomer: '',
    createName: localStorage.getItem('fullname'),
    isValidDateRange: () => {
      return (
        this.voucher.startDate &&
        this.voucher.endDate &&
        this.voucher.startDate < this.voucher.endDate
      );
    },
  };
  pattern: '^[a-zA-Z0-9\s]+$';
  so: '^\d+(\.\d+)?$';
  currentDate: Date = new Date();
  gridApi: any;
  constructor(private voucherService: VoucherShipService,
              private  router: Router,
              private toastr: ToastrService) {
    this.columnDefs = [
      {
        headerName: 'Mã Khách hàng',
        field: 'code',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: true,
      },
      {
        headerName: 'Tên khách hàng',
        field: 'fullname',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Ngày sinh',
        field: 'birthday',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Giới tính',
        field: 'gender',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Số lượt mua',
        field: 'orderCount',
        sortable: true,
        filter: true,
        editable: true,
      },
    ];
  }
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  isStartDateValid(): boolean {
    return !this.voucher.startDate || this.voucher.startDate >= this.currentDate;
  }
  ngOnInit(): void {
    this.voucherService.getCustomer().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  addVoucher() {
    const arrayCustomer = this.voucher.optionCustomer === '0' ? null : this.gridApi.getSelectedRows();
    const userConfirmed = confirm('Bạn có muốn thêm voucher không?');
    if (!userConfirmed) {
      return;
    }
    const obj = {
      ...this.voucher,
      customerAdminDTOList: arrayCustomer,
    };
    this.voucherService.createVoucher(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        this.toastr.success('Thêm voucher  thành công');
        this.router.navigateByUrl('/admin/voucherFS');
      },
      (error) => {
        // Handle errors if the discount creation fails
        this.toastr.error('Thêm voucher thất bại');
      }
    );
  }
}
