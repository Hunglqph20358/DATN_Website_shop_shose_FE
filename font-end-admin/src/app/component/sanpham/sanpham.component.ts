import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemSanPhamComponent} from "./them-san-pham/them-san-pham.component";
import {ProductService} from "../../service/product.service";
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
    this.getALLproduct();
  }
  getALLproduct(){
    this.spsv.getAllProduct().subscribe(res => {
      this.rowData = res;
    });
  }
  openAdd(){
    const dialogref = this.matdialog.open(ThemSanPhamComponent, {
      width: '130vh',
      height: '80vh'
    });
    dialogref.afterClosed().subscribe(result => {
      if (result === 'addProduct'){
        this.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
}
