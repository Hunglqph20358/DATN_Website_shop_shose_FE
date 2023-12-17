import {Component, OnInit} from '@angular/core';
import {VoucherService} from 'src/app/service/voucher.service';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

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
  checkAllow: boolean = false;
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    voucherType: '',
    conditions: 0,
    quantity: 0,
    limitCustomer: 0,
    customerAdminDTOList: '',
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

  toggleAllowDiscount(event: any) {
    this.checkAllow = event.target.checked;
    console.log(event);
  }

  addVoucher() {
    const userConfirmed = confirm('Bạn có muốn thêm voucher không?');
    if (!userConfirmed) {
      return;
    }
    const arrayCustomer = this.voucher.optionCustomer === '0' ? null : this.gridApi.getSelectedRows();
    const obj = {
      ...this.voucher,
      allow: this.checkAllow === true ? 1 : 0,
      customerAdminDTOList: arrayCustomer,
    };
    this.voucherService.createVoucher(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        console.log('Discount added successfully', response);
        this.toastr.success('Thêm voucher thành công');

        this.router.navigateByUrl('/admin/voucher');
      },
      (error) => {
        // Handle errors if the discount creation fails
        this.toastr.error('Thêm voucher thất bại');
        console.error('Error adding discount', error);
      }
    );
  }

}
