import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ThemSanPhamComponent} from './them-san-pham/them-san-pham.component';
import {SuaSanPhamComponent} from './sua-san-pham/sua-san-pham.component';
import {ProductService} from '../../service/product.service';
import {ActionVoucherComponent} from '../voucher/action-voucher/action-voucher.component';
import * as FileSaver from 'file-saver';
import {formatDateTime, formatMoney, getFormattedDateCurrent} from '../../util/util';
import {ImportFileComponent} from './import-file/import-file.component';
import {SanPhamActionComponent} from './san-pham-action/san-pham-action.component';
import {ImageRendererComponent} from './image-renderer/image-renderer.component';

@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private spsv: ProductService, private changeDetectorRef: ChangeDetectorRef,
              private cdr: ChangeDetectorRef) {
    this.columnDefs = [
      {
        headerName: 'Ảnh sản phẩm',
        field: 'image',
        sortable: true,
        filter: true,
        width: 150,
        // cellRenderer: (params) => {
        //   return `<div>
        // <img width="40px" height="40px" src="${params.data?.imagesDTOList[0].imageName}">
        // </div>`;
        // }
      },
      {
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
        width: 110
      },
      {
        headerName: 'Tên sản phẩm',
        field: 'name',
        sortable: true,
        filter: true,
        width: 150},
      {
        headerName: 'Ngày tạo',
        field: 'createDate',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return `${formatDateTime(params.data?.createDate)}`;
        }
      },
      {
        headerName: 'Ngày cập nhật ',
        field: 'updateDate',
        sortable: true, filter: true,
        width: 150,
        valueGetter: (params) => {
          return `${formatDateTime(params.data?.updateDate)}`;
        }
      },
      {
        headerName: 'Tên người tạo',
        field: 'createName',
        sortable: true,
        filter: true,
        width: 150},
      {
        headerName: 'Tên người cập nhật',
       field: 'updateName',
       sortable: true,
       filter: true,
       width: 150
      },
      {
        headerName: 'Gía',
        field: '',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return `${formatMoney(params.data?.price)}`;
        }
      },
      {
        headerName: 'Tên thương hiệu',
        field: '',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return params.data?.brandAdminDTO?.name;
        }
      },
      {
        headerName: 'Tên danh mục',
        field: '',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return params.data?.categoryAdminDTO.name;
        }
      },
      {
        headerName: 'Tên chất liệu',
        field: '',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return params.data?.materialAdminDTO.name;
        }
      },
      {headerName: 'Mô tả',
       field: 'description',
       sortable: true,
       filter: true
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        width: 150,
        valueGetter: (params) => {
          return params.data?.status === 0 ? 'Hoạt động' : 'Ngưng hoạt động';
        }
      },
      {
        headerName: 'Chất liệu đế',
        field: 'idSole',
        sortable: true,
        filter: true,
        width: 110,
        valueGetter: (params) => {
          return params.data?.soleAdminDTO.soleMaterial;
        }
      },
      {headerName: 'Chức năng',
       field: '',
       cellRendererFramework: SanPhamActionComponent,
       width: 110},
    ];
  }

  ngOnInit(): void {
    this.spsv.getAllProduct().subscribe(res => {
      this.rowData = res;
    });
  }

  exportData() {
    this.spsv.exportExcelProduct().subscribe((data: Blob) => {
      const currentDate = new Date();
      const formattedDate = getFormattedDateCurrent(currentDate);
      const fileName = `DS_SanPham_${formattedDate}.xlsx`;
      FileSaver.saveAs(data, fileName);
    });
    this.changeDetectorRef.detectChanges();
  }

  openPopupImport() {
    this.matdialog.open(ImportFileComponent, {
      data: null,
      disableClose: true,
      hasBackdrop: true,
      width: '446px'
    }).afterClosed().subscribe(res => {
      if (res === 'cancel-import') {
        this.ngOnInit();
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}

