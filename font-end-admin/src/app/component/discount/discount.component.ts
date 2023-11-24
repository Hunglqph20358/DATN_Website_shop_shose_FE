import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActionDiscountComponent} from './action-discount/action-discount.component';
import {Router} from '@angular/router';
import {DiscountService} from '../../service/discount.service';
import {placeholdersToParams} from "@angular/compiler/src/render3/view/i18n/util";
import {formatDateTime} from "../../util/util";
import {ShowComponent} from "./show/show.component";

@Component({
  selector: 'app-banggiamgia',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css'],
})
export class DiscountComponent implements OnInit {
  rowData: any = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  checkedIsdel = false;
  idStaff: string = '';

  constructor(private apiService: DiscountService) {
    this.columnDefs = [
      {
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'startDate',
        sortable: true,
        filter: true,
        minWidth: 80,
        valueGetter: params => {
          return `${formatDateTime(params.data.startDate)}`;
        }
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'endDate',
        sortable: true,
        filter: true,
        minWidth: 80,
        valueGetter: params => {
          return `${formatDateTime(params.data.endDate)}`;
        }
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: this.statusRenderer.bind(this),
      },
      {
        headerName: 'Đã sử dụng',
        valueGetter: function (params) {
          const useDiscount = params.data.used_count || 0;
          const quantity = params.data.quantity || 1;
          return `${useDiscount} / ${quantity}`;
        }
      },
      {
        headerName: 'Hiển thị',
        field: '',
        cellRenderer: (params) => {
          return `<div>
  <label class="switch">
    <input type="checkbox" ${params.data.idel === '1' ? 'checked' : ''}>
    <span class="slider round"></span>
  </label>
</div>`;
        },
        onCellClicked: (params) => {
          return this.checkIsdell(params);
        }
      },
      {
        headerName: 'Action',
        field: '',
        cellRendererFramework: ActionDiscountComponent,
        pinned: 'right',
      },
    ];
  }

  // Định nghĩa Cell Renderer ở mức lớp
  statusRenderer(params) {
    if (params.value == 0) {
      return 'Còn hạn';
    } else if (params.value == 1) {
      return 'Hết hạn';
    } else {
      return 'Không rõ';
    }
  }

  ngOnInit(): void {
    this.apiService.getSomeData().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
  }

  checkIsdell(data: any) {
    if(data == 1){
      //gọi 1 api update lại idel = 0
    }else {

    }
  }
}
