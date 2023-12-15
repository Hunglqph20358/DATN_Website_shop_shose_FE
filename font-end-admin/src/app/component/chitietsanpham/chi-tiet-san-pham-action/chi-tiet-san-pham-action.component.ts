import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../../service/category.service';
import {DanhmucComponent} from '../../danhmuc/danhmuc.component';
import {ProductdetailService} from '../../../service/productdetail.service';
import {ChitietsanphamComponent} from '../chitietsanpham.component';
import {SuaDanhMucComponent} from '../../danhmuc/sua-danh-muc/sua-danh-muc.component';
import {SuaChiTietSanPhamComponent} from '../sua-chi-tiet-san-pham/sua-chi-tiet-san-pham.component';

@Component({
  selector: 'app-chi-tiet-san-pham-action',
  templateUrl: './chi-tiet-san-pham-action.component.html',
  styleUrls: ['./chi-tiet-san-pham-action.component.css']
})
export class ChiTietSanPhamActionComponent implements ICellRendererAngularComp, OnInit {
  params: any;
  rowData = [];
  agInit(params: any): void {
    this.params = params.data;
  }

  refresh(): boolean {
    return false;
  }

  constructor(private matdialog: MatDialog,
              private prddtsv: ProductdetailService, private cdr: ChangeDetectorRef,
              private chitietsanphamComponent: ChitietsanphamComponent) { }

  ngOnInit(): void {
  }
  openUpdate(){
    const dialogref = this.matdialog.open(SuaChiTietSanPhamComponent, {
      width: '60vh',
      height: '60vh',
      data: this.params
    });
    dialogref.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'saveProductDetail') {
        this.chitietsanphamComponent.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
  deleteProductDetail(productDetail?: any) {
    productDetail = this.params.id;
    this.prddtsv.DeleteProductDetail(productDetail).subscribe(() => {
      this.chitietsanphamComponent.ngOnInit();
      this.cdr.detectChanges();
    });
  }

}
