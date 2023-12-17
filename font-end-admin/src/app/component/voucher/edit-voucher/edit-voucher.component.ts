import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from "../../../service/voucher.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css'],
})
export class EditVoucherComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private voucherService: VoucherService,
              private rou: Router,
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
  checkAllow: boolean = false;
  isHidden = true;
  gridApi: any;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  fullname = '';
  check: boolean;
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
  pattern: '^[a-zA-Z0-9\s]+$';
  so: '^\d+(\.\d+)?$';
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng

  isStartDateValid(): boolean {
    return !this.voucher.startDate || this.voucher.startDate >= this.currentDate;
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  ngOnInit(): void {
    this.voucherService.getCustomer().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
    this.isHidden = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      console.log(id);
      this.voucherService.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = Array.isArray(response) ? response[0] : response;
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditions = firstElement.conditions;
        this.voucher.voucherType = firstElement.voucherType;
        this.voucher.endDate = firstElement.endDate;
        this.voucher.quantity = firstElement.quantity;
        this.voucher.customerAdminDTOList = firstElement.customerAdminDTOList;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.apply = firstElement.apply;
        this.voucher.limitCustomer = firstElement.limitCustomer;
        this.voucher.startDate = firstElement.startDate;
        this.voucher.allow = firstElement.allow;
        console.log(this.voucher);
      });
    });
    console.log(this.voucher);
  }
  editVoucher(){
    const arrayCustomer = this.voucher.optionCustomer === '0' ? null : this.gridApi.getSelectedRows();
    const obj = {
      ...this.voucher,
      customerAdminDTOList: arrayCustomer,
    };
    this.check = false;
    if (this.voucher.idel === 0) {
      this.check = true;
    }
    const userConfirmed = confirm('Bạn có muốn sửa voucher không?');
    if (!userConfirmed) {
      return;
    }
    if (this.check === false){
      this.voucherService
        .updateVoucher(this.voucher.id, obj)
        .subscribe(() => {
          this.toastr.success('Sửa voucher thành công');
          this.rou.navigateByUrl('/admin/voucher');
        },
          (error) => {
            // Handle errors if the discount creation fails
            this.toastr.error('Sửa voucher thất bại');
            console.error('Error edit voucher', error);
          }
        );
    }
  }
  toggleAllowDiscount(event: any) {
    this.checkAllow = event.target.checked;
    console.log(event);
  }
}
