import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../../../service/voucher.service";
import {Router} from "@angular/router";
import {VoucherShipService} from "../../../service/voucher-ship.service";

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
    voucherType: '',
    conditions: '',
    quantity: '',
    customerAdminDTOList: '',
    limitCustomer: '',
    allow: '',
  };
  gridApi: any;
  constructor(private voucherService: VoucherShipService,
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
  ngOnInit(): void {
    this.voucherService.getCustomer().subscribe((response) => {
      this.rowData = response;
      debugger
      console.log(response);
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  addVoucher() {
    const obj = {
      ...this.voucher,
      customerAdminDTOList: this.gridApi.getSelectedRows(),
    };
    this.voucherService.createVoucher(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        console.log('Discount added successfully', response);
        this.router.navigateByUrl('/admin/voucherFS');
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
