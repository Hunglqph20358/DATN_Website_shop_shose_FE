import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VoucherShipService} from '../../../service/voucher-ship.service';
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {ValidateInput} from "../../model/validate-input";
import {CommonFunction} from "../../../util/common-function";

@Component({
  selector: 'app-creat-voucher-ship',
  templateUrl: './creat-voucher-ship.component.html',
  styleUrls: ['./creat-voucher-ship.component.css']
})
export class CreatVoucherShipComponent implements OnInit {
  startDateTouched = false;
  checkStartDate: boolean = false;
  checkEndDate: boolean = false;
  endDateTouched = false;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: 0,
    conditionApply: 0,
    quantity: 0,
    customerAdminDTOList: '',
    optionCustomer: '0',
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
  validName: ValidateInput = new ValidateInput();
  validDescription: ValidateInput = new ValidateInput();
  validReducedValue: ValidateInput = new ValidateInput();
  validconditionApply: ValidateInput = new ValidateInput();
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
  isValidDateRange(): void {
    if (
      this.voucher.startDate &&
      this.voucher.endDate &&
      this.voucher.startDate > this.voucher.endDate
    ) {
      this.checkEndDate = true;
      console.log('Date range is valid.');
    } else {
      this.checkEndDate = false;
      // Cũng có thể thực hiện công việc khác nếu cần.
      console.log('Date range is not valid.');
    }
  }
  isEndDateValid() {
    this.endDateTouched = true;
    this.isValidDateRange();
  }
  isStartDateValid() {
    // console.log(event);
    const date = new Date();
    console.log(date.getTime());
    console.log(new Date(this.voucher.startDate).getTime());
    if (new Date(this.voucher.startDate).getTime() < date.getTime()){
      this.checkStartDate = true;
    }else {
      this.checkStartDate = false;
    }
    console.log(this.checkStartDate);
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
    this.isEndDateValid();
    this.isStartDateValid();
    this.validateName();
    this.validateReducedValue();
    this.validateDescription();
    this.validateConditionApply();
    if (!this.validName.done || !this.validDescription.done || !this.validReducedValue.done
      || !this.validconditionApply.done) {
      return;
    }
    Swal.fire({
      title: 'Bạn có muốn thêm Voucher FreeShip không?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Thêm'
    }).then((result) => {
      if (result.isConfirmed) {
        const arrayCustomer = this.voucher.optionCustomer === '0' ? null : this.gridApi.getSelectedRows();
        const obj = {
          ...this.voucher,
          customerAdminDTOList: arrayCustomer,
        };
        this.voucherService.createVoucher(obj).subscribe(
          (response) => {
            // Handle the response if needed, e.g., show a success message
            this.router.navigateByUrl('/admin/voucherFS');
          },
          (error) => {
            // Handle errors if the discount creation fails
            this.toastr.error('Thêm Voucher FreeShip thất bại');
          }
        );
        Swal.fire({
          title: 'Thêm Voucher FreeShip thành công',
          icon: 'success'
        });
      }
    });
  }
  revoveInvalid(result) {
    result.done = true;
  }
  validateName() {
    this.validName = CommonFunction.validateInput(this.voucher.name, 50, null );
  }
  validateDescription() {this.validDescription = CommonFunction.validateInput(this.voucher.description, 50, null);
  }
  validateReducedValue() {
    this.validReducedValue = CommonFunction.validateInput(this.voucher.reducedValue, 250, /^\d+(\.\d+)?$/);
  }
  validateConditionApply() {
    this.validconditionApply = CommonFunction.validateInput(this.voucher.conditionApply, 250, /^\d+(\.\d+)?$/);
  }

}
