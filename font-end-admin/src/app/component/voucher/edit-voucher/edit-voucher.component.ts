import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from "../../../service/voucher.service";

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrls: ['./edit-voucher.component.css'],
})
export class EditVoucherComponent implements OnInit {
  isHidden = true;
  gridApi: any;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  fullname = '';
  check: boolean;
  voucher: any = {
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    reducedValue: '',
    voucherType: '',
    conditions: '',
    quantity: '',
    idel: '',
  };
  constructor(private activatedRoute: ActivatedRoute,
              private voucherService: VoucherService,
              private rou: Router) {
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
        this.voucher.reducedValue = firstElement.reducedValue;
        this.voucher.startDate = firstElement.startDate;
        console.log(this.voucher);
      });
    });
    console.log(this.voucher);
  }
  editVoucher(){
    this.check = false;
    if (this.voucher.idel === 0) {
      this.check = true;
    }
    if (this.check === false){
      this.voucherService
        .updateVoucher(this.voucher.id, this.voucher)
        .subscribe(() => {
          this.rou.navigateByUrl('/admin/voucher');
        });
    }
  }
  toggleAllowDiscount() {
    this.voucher.allow = this.voucher.allow === 1 ? 0 : 1;
  }
}
