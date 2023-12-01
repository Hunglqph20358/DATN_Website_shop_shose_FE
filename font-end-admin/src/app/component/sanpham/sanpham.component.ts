import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ThemSanPhamComponent} from './them-san-pham/them-san-pham.component';
import {SuaSanPhamComponent} from './sua-san-pham/sua-san-pham.component';
import {ProductService} from '../../service/product.service';
import {ActionVoucherComponent} from '../voucher/action-voucher/action-voucher.component';
import * as FileSaver from 'file-saver';
import {getFormattedDateCurrent} from '../../util/util';
import {ImportFileComponent} from './import-file/import-file.component';

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
              private spsv: ProductService, private changeDetectorRef: ChangeDetectorRef) {
              private spsv: ProductService,
              private cdr: ChangeDetectorRef) {
    this.columnDefs = [
      {
        headerName: 'Code',
        field: 'code',
        sortable: true,
        filter: true,
        width: 110
      },
      {headerName: 'ProductName', field: 'name', sortable: true, filter: true, width: 150},
      {headerName: 'Create Date', field: 'createDate', sortable: true, filter: true, width: 150},
      {headerName: 'Update Date ', field: 'updateDate', sortable: true, filter: true, width: 150},
      {headerName: 'CreateName ', field: 'createName', sortable: true, filter: true, width: 150},
      {headerName: 'UpdateName ', field: 'updateName', sortable: true, filter: true, width: 150},
      {headerName: 'Price ', field: 'price', sortable: true, filter: true, width: 150},
      {headerName: 'NameBrand ', field: 'idBrand', sortable: true, filter: true, valueGetter: params => {
          return params.data.brandAdminDTO.name;
        }, width: 150},
      {headerName: 'NameCategory ', field: 'idCategory', sortable: true, filter: true, valueGetter: params => {
          return params.data.categoryAdminDTO.name;
        }, width: 150},
      {headerName: 'NameMaterial ', field: 'idMaterial', sortable: true, filter: true, valueGetter: params => {
          return params.data.materialAdminDTO.name;
        }, width: 150},
      {headerName: 'Description ', field: 'description', sortable: true, filter: true},
      {headerName: 'Status', field: 'status', sortable: true, filter: true, valueGetter: (params) => {
          return params.data.status === 0 ? 'Hoạt động' : 'Ngưng hoạt động';
        }, width: 150},
      {headerName: 'SoleHeight', field: 'idSole', sortable: true, filter: true, valueGetter: params => {
          return params.data.soleAdminDTO.soleHeight;
        }, width: 110},
      {headerName: 'Action', field: '', cellRendererFramework: SanPhamActionComponent, width: 110},
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
