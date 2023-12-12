import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/service/voucher.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creat-voucher',
  templateUrl: './creat-voucher.component.html',
  styleUrls: ['./creat-voucher.component.css'],
})
export class CreatVoucherComponent implements OnInit {
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
    voucherType: '',
    conditions: '',
    quantity: '',
    customerAdminDTOList: '',
    limitCustomer: '',
    allow: '',
    appy: '',
    optionCustomer: '',
    createName: localStorage.getItem('fullname'),
    isValidDateRange: () => {
      return (
        this.voucher.startDate &&
        this.voucher.endDate &&
        this.voucher.startDate < this.voucher.endDate
      );
    },
  };
  currentDate: Date = new Date();
  gridApi: any;
  fullname = '';
  constructor(private voucherService: VoucherService,
              private  router: Router) {
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
  pattern: '^[a-zA-Z0-9\s]+$';
  so: '^\d+(\.\d+)?$';
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
    const arrayCustomer = this.voucher.optionCustomer === '0' ? this.rowData : this.gridApi.getSelectedRows();
    const obj = {
       ...this.voucher,
       customerAdminDTOList: arrayCustomer,
     };
    this.voucherService.createVoucher(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        console.log('Discount added successfully', response);
        this.router.navigateByUrl('/admin/voucher');
      },
      (error) => {
        // Handle errors if the discount creation fails
        console.error('Error adding discount', error);
      }
    );
  }
  toggleAllowDiscount() {
    this.voucher.allow = this.voucher.allow === 1 ? 0 : 1;
  }
}
