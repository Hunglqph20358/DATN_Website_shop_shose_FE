import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ThemSanPhamComponent} from './them-san-pham/them-san-pham.component';
import {SuaSanPhamComponent} from './sua-san-pham/sua-san-pham.component';
import {ProductService} from '../../service/product.service';
import {ActionVoucherComponent} from '../voucher/action-voucher/action-voucher.component';
import * as FileSaver from 'file-saver';
import {getFormattedDateCurrent} from '../../util/util';
import {ImportFileComponent} from './import-file/import-file.component';
import {SanPhamActionComponent} from './san-pham-action/san-pham-action.component';

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
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
        width: 110
      },
      {headerName: 'Tên sản phẩm', field: 'name', sortable: true, filter: true, width: 150},
      {headerName: 'Ngày tạo', field: 'createDate', sortable: true, filter: true, width: 150},
      {headerName: 'Ngày cập nhật ', field: 'updateDate', sortable: true, filter: true, width: 150},
      {headerName: 'Tên người tạo ', field: 'createName', sortable: true, filter: true, width: 150},
      {headerName: 'Tên người cập nhật', field: 'updateName', sortable: true, filter: true, width: 150},
      {headerName: 'Gía ', field: 'price', sortable: true, filter: true, width: 150},
      {headerName: 'Tên thương hiệu ', field: 'idBrand', sortable: true, filter: true, valueGetter: params => {
          return params.data.brandAdminDTO.name;
        }, width: 150},
      {headerName: 'Tên danh mục ', field: 'idCategory', sortable: true, filter: true, valueGetter: params => {
          return params.data.categoryAdminDTO.name;
        }, width: 150},
      {headerName: 'Tên chất liệu ', field: 'idMaterial', sortable: true, filter: true, valueGetter: params => {
          return params.data.materialAdminDTO.name;
        }, width: 150},
      {headerName: 'Mô tả ', field: 'description', sortable: true, filter: true},
      {headerName: 'Trạng thái', field: 'status', sortable: true, filter: true, valueGetter: (params) => {
          return params.data.status === 0 ? 'Hoạt động' : 'Ngưng hoạt động';
        }, width: 150},
      {headerName: 'Chiều cao đế', field: 'idSole', sortable: true, filter: true, valueGetter: params => {
          return params.data.soleAdminDTO.soleHeight;
        }, width: 110},
      {headerName: 'Chức năng', field: '', cellRendererFramework: SanPhamActionComponent, width: 110},
    ];
  }
  ngOnInit(): void {
    this.spsv.getAllProduct().subscribe(res => {
      this.rowData = res;
    });
  }

  openAdd() {
    this.matdialog.open(ThemSanPhamComponent, {
      width: '60vh',
      height: '80vh'
    });
  }

  openUpdate() {
    this.matdialog.open(SuaSanPhamComponent, {
      width: '60vh',
      height: '80vh'
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

