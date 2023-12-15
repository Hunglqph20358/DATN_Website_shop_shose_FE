import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductdetailService} from '../../../service/productdetail.service';
import {ProductService} from '../../../service/product.service';
import {MausacService} from '../../../service/mausac.service';
import {SizeService} from '../../../service/size.service';
import {SizeInterface} from '../../../interface/size-interface';
import {ColorInterface} from '../../../interface/color-interface';
import {ProductInterface} from '../../../interface/product-interface';

@Component({
  selector: 'app-them-chi-tiet-san-pham',
  templateUrl: './them-chi-tiet-san-pham.component.html',
  styleUrls: ['./them-chi-tiet-san-pham.component.css']
})
export class ThemChiTietSanPhamComponent implements OnInit {
  IdProduct: number;
  IdColor: number;
  IdSize: number;
  shoeCollar: number;
  quantity: string;
  size: SizeInterface[] = [];
  color: ColorInterface[] = [];
  product: ProductInterface[] = [];
  rowData = [];
  constructor(public dialogRef: MatDialogRef<ThemChiTietSanPhamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private prddtsv: ProductdetailService,
              private prdsv: ProductService,
              private clsv: MausacService,
              private szsv: SizeService) { }

  ngOnInit(): void {
    this.getAllColor();
    this.getAllProduct();
    this.getAllSize();
  }
  getAllSize() {
    this.szsv.getAllSize().subscribe(res => {
      this.size = res;
    });
  }
  getAllColor() {
    this.clsv.getAllMauSac().subscribe(res => {
      this.color = res;
    });
  }
  getAllProduct() {
    this.prdsv.getAllProduct().subscribe(res => {
      this.product = res;
    });
  }
  clickadd(){
      const productDetail = {
        idProduct: this.IdProduct,
        idColor: this.IdColor,
        idSize: this.IdSize,
        shoeCollar: this.shoeCollar,
        quantity: this.quantity
      };
      this.prddtsv.CreateProductDetail(productDetail).subscribe(
        result => {
          console.log('productDetail add success', result);
          this.dialogRef.close('addProductDetail');
        },
        error => {
          console.error('productDetail add error', error);
        }
      );
  }

}
