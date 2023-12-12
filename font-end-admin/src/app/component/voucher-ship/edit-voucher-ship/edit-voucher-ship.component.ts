import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VoucherService} from '../../../service/voucher.service';
import {VoucherShipService} from "../../../service/voucher-ship.service";

@Component({
  selector: 'app-edit-voucher-ship',
  templateUrl: './edit-voucher-ship.component.html',
  styleUrls: ['./edit-voucher-ship.component.css']
})
export class EditVoucherShipComponent implements OnInit {

  isHidden = true;
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
  };
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  gridApi: any;
  constructor(private activatedRoute: ActivatedRoute,
              private service: VoucherShipService,
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
    this.isHidden = true;
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      console.log(id);
      this.service.getDetailVoucher(id).subscribe((response: any[]) => {
        const firstElement = response[0];
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
    this.service
      .updateVoucher(this.voucher.id, this.voucher)
      .subscribe(() => {
        this.rou.navigateByUrl('/admin/voucherFS');
      });
  }
  toggleAllowVoucher() {
    this.voucher.allow = this.voucher.allow === 1 ? 0 : 1;
  }
}
