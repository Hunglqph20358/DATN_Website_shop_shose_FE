import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrandService} from '../../../service/brand.service';
import {CategoryInterface} from '../../../interface/category-interface';
import {CategoryService} from '../../../service/category.service';
import {BrandInterface} from '../../../interface/brand-interface';
import {SoleService} from '../../../service/sole.service';
import {MaterialpostService} from '../../../service/materialpost.service';
import {SoleInterface} from '../../../interface/sole-interface';
import {MaterialInterface} from '../../../interface/material-interface';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})
export class ThemSanPhamComponent implements OnInit {

  rowData = [];
  Code: string;
  Name: string;
  CreateName: string;
  IdBrand: number;
  IdCategory: number;
  IdMaterial: number;
  IdSole: number;
  Price: number;
  Description: string;
  Status: number;
  categories: CategoryInterface[] = [];
  brand: BrandInterface[] = [];
  sole: SoleInterface[] = [];
  material: MaterialInterface[] = [];
  constructor( public dialogRef: MatDialogRef<ThemSanPhamComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private prdsv: ProductService,
               private brsv: BrandService,
               private ctsv: CategoryService,
               private slsv: SoleService,
               private mtsv: MaterialpostService) { }

  ngOnInit(): void {
   this.getALLBrand();
   this.getAllCategory();
   this.getAllMaterial();
   this.getAllSole();
  }
  getALLBrand(){
    this.brsv.getAllBrand().subscribe(res => {
      this.brand = res;
    });
  }
  getAllCategory(){
    this.ctsv.getAllCategory().subscribe(res => {
      this.categories = res;
    });
  }
  getAllSole(){
    this.slsv.getAllSole().subscribe(res => {
      this.sole = res;
    });
  }
  getAllMaterial(){
    this.mtsv.getAllMaterial().subscribe(res => {
      this.material = res;
    });
  }
  clickaddProduct(){
    const products = {
      code: this.Code,
      name: this.Name,
      createName: this.CreateName,
      idBrand: this.IdBrand,
      idCategory: this.IdCategory,
      idMaterial: this.IdMaterial,
      idSole: this.IdSole,
      description: this.Description,
      status: this.Status,
      price: this.Price
    };
    this.prdsv.CreateProduct(products).subscribe(
      result => {
        console.log('Product add success', result);
        this.dialogRef.close('addProduct');
      },
      error => {
        console.error('Product add error', error);
      }
    );
  }

}
