import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SuaSanPhamComponent} from '../sua-san-pham/sua-san-pham.component';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {MatDialog} from '@angular/material/dialog';

import {SanphamComponent} from '../sanpham.component';
import {ProductService} from '../../../service/product.service';
@Component({
  selector: 'app-san-pham-action',
  templateUrl: './san-pham-action.component.html',
  styleUrls: ['./san-pham-action.component.css']
})
export class SanPhamActionComponent implements ICellRendererAngularComp, OnInit {

  rowData = [];
  params: any;
  constructor(private matdialog: MatDialog,
              private prdsv: ProductService,
              private cdr: ChangeDetectorRef,
              private sanphamComponent: SanphamComponent) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  deleteProduct(product?: any) {
    product = this.params.id;
    this.prdsv.DeleteProduct(product).subscribe(() => {
      this.sanphamComponent.ngOnInit();
      this.cdr.detectChanges();
    });
  }
  openUpdate(){
    const dialogref = this.matdialog.open(SuaSanPhamComponent, {
      width: '100vh',
      height: '70vh',
      data: this.params
    });
    dialogref.afterClosed().subscribe(result => {
      if (result === 'saveProduct') {
        this.sanphamComponent.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
  getAllProduct(){
    this.prdsv.getAllProduct().subscribe(res => {
      this.rowData = res;
    });
  }

  agInit(params: any): void {
    this.params = params.data;
  }

  refresh(): boolean {
    return false;
  }

}
