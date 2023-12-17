import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from '../../../service/voucher.service';
import {VoucherShipService} from "../../../service/voucher-ship.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-voucher-ship',
  templateUrl: './edit-voucher-ship.component.html',
  styleUrls: ['./edit-voucher-ship.component.css']
})
export class EditVoucherShipComponent implements OnInit {

  isHidden = true;
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
    isValidDateRange: () => {
      return (
        this.voucher.startDate &&
        this.voucher.endDate &&
        this.voucher.startDate < this.voucher.endDate
      );
    },
  };
  check: boolean;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  pattern: '^[a-zA-Z0-9\s]+$';
  so: '^\d+(\.\d+)?$';
  currentDate: Date = new Date();
  gridApi: any;

  constructor(private activatedRoute: ActivatedRoute,
              private service: VoucherShipService,
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
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  isStartDateValid(): boolean {
    return !this.voucher.startDate || this.voucher.startDate >= this.currentDate;
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
        this.voucher.conditions = firstElement.conditions;
        this.voucher.endDate = firstElement.endDate;
        this.voucher.quantity = firstElement.quantity;
        this.voucher.customerAdminDTOList = firstElement.customerAdminDTOList;
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = firstElement.startDate;
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
      this.service
        .updateVoucher(this.voucher.id, obj)
        .subscribe(() => {
            this.toastr.success('Sửa voucher thành công');
            this.rou.navigateByUrl('/admin/voucherFS');
          },
          (error) => {
            // Handle errors if the discount creation fails
            this.toastr.error('Sửa voucher thất bại');
            console.error('Error edit voucher', error);
          }
        );
    }
  }
}
