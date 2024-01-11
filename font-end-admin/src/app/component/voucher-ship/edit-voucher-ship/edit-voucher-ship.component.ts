import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from '../../../service/voucher.service';
import {VoucherShipService} from "../../../service/voucher-ship.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {ValidateInput} from "../../model/validate-input";
import {CommonFunction} from "../../../util/common-function";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-edit-voucher-ship',
  templateUrl: './edit-voucher-ship.component.html',
  styleUrls: ['./edit-voucher-ship.component.css']
})
export class EditVoucherShipComponent implements OnInit {

  isHidden = true;
  startDateTouched = false;
  checkStartDate: boolean = false;
  checkEndDate: boolean = false;
  endDateTouched = false;
  voucher: any = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: 0,
    conditionApply: '',
    quantity: 0,
    optionCustomer: '0',
    customerAdminDTOList: '',
    limitCustomer: '',
  };
  validQuantity: ValidateInput = new ValidateInput();
  validName: ValidateInput = new ValidateInput();
  validDescription: ValidateInput = new ValidateInput();
  validReducedValue: ValidateInput = new ValidateInput();
  validconditionApply: ValidateInput = new ValidateInput();
  check: boolean;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  currentDate: Date = new Date();
  gridApi: any;

  constructor(private activatedRoute: ActivatedRoute,
              private service: VoucherShipService,
              private rou: Router,
              private toastr: ToastrService, private datePipe: DatePipe) {
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
    const date = new Date();
    this.startDateTouched = true;
    if (new Date(this.voucher.startDate).getTime() < date.getTime()){
      this.checkStartDate = true;
    }else {
      this.checkStartDate = false;
    }
    console.log(this.checkStartDate);
  }


  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  ngOnInit(): void {
    this.service.getCustomer().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
    this.isHidden = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      console.log(id);
      this.service.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = Array.isArray(response) ? response[0] : response;
        console.log(firstElement);
        this.voucher.id = firstElement.id;
        this.voucher.name = firstElement.name;
        this.voucher.description = firstElement.description;
        this.voucher.conditionApply = firstElement.conditionApply;
        this.voucher.endDate = this.formatDate(firstElement.endDate);
        this.voucher.quantity = firstElement.quantity;
        this.voucher.customerAdminDTOList = firstElement.customerAdminDTOList;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = this.formatDate(firstElement.startDate);
        console.log(this.voucher);
      });
    });
    console.log(this.voucher);
  }
  editVoucher(){
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
      title: 'Bạn có muốn sửa Voucher FreeShip không?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sửa'
    }).then((result) => {
      if (result.isConfirmed) {
        const arrayCustomer = this.voucher.optionCustomer === '0' ? null : this.gridApi.getSelectedRows();
        const obj = {
          ...this.voucher,
          customerAdminDTOList: arrayCustomer,
        };
        this.service.updateVoucher(this.voucher.id, obj).subscribe(
          (response) => {
            // Handle the response if needed, e.g., show a success message
            this.rou.navigateByUrl('/admin/voucherFS');
          },
          (error) => {
            // Handle errors if the discount creation fails
            this.toastr.error('Sửa Voucher FreeShip thất bại');
          }
        );
        Swal.fire({
          title: 'Sửa Voucher FreeShip thành công',
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
  validateDescription() {this.validDescription = CommonFunction.validateInput(this.voucher.description, 50, null );
  }
  validateReducedValue() {
    this.validReducedValue = CommonFunction.validateInput(this.voucher.reducedValue, 250, /^\d+(\.\d+)?$/);
  }
  validateConditionApply() {
    this.validconditionApply = CommonFunction.validateInput(this.voucher.conditionApply, 250, /^\d+(\.\d+)?$/);
  }
  validateQuantity() {
    this.validQuantity = CommonFunction.validateInput(this.voucher.quantity, 50, /^[1-9]\d*(\.\d+)?$/ );
  }

  checkDate(event: any) {
    console.log(event.target.value);
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm') || '';
  }}
