import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../../../service/category.service';
import {ProductdetailService} from '../../../service/productdetail.service';
import {ProductService} from '../../../service/product.service';
import {MausacService} from '../../../service/mausac.service';
import {SizeService} from '../../../service/size.service';
import {SizeInterface} from '../../../interface/size-interface';
import {ColorInterface} from '../../../interface/color-interface';
import {ProductInterface} from '../../../interface/product-interface';

@Component({
  selector: 'app-sua-chi-tiet-san-pham',
  templateUrl: './sua-chi-tiet-san-pham.component.html',
  styleUrls: ['./sua-chi-tiet-san-pham.component.css']
})
export class SuaChiTietSanPhamComponent implements OnInit {
  // productDetai: any = {
  //   idColor: null,
  //   idProduct: null,
  //   idSize: null,
  //   quantity : null,
  //   shoeCollar: null,
  // };
  size: SizeInterface[] = [];
  color: ColorInterface[] = [];
  product: ProductInterface[] = [];
  rowData = [];
  constructor(public dialogRef: MatDialogRef<SuaChiTietSanPhamComponent>,
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
  clickUpdate(id: number){
      const productDetail = {
        idProduct: this.data.idProduct,
        idSize: this.data.idSize,
        idColor: this.data.idColor,
        quantity: this.data.quantity,
        shoeCollar: this.data.shoeCollar
      };
      this.prddtsv.UpdateProductDetail(id, productDetail).subscribe(
        result => {
          console.log('productDetail add success', result);
          this.dialogRef.close('saveProductDetail');
        },
        error => {
          console.error('productDetail add error', error);
        }
      );
  }

}
