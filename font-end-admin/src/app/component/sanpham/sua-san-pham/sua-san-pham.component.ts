import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductService} from '../../../service/product.service';
import {BrandService} from '../../../service/brand.service';
import {CategoryService} from '../../../service/category.service';
import {SoleService} from '../../../service/sole.service';
import {MaterialpostService} from '../../../service/materialpost.service';
import {CategoryInterface} from '../../../interface/category-interface';
import {BrandInterface} from '../../../interface/brand-interface';
import {SoleInterface} from '../../../interface/sole-interface';
import {MaterialInterface} from '../../../interface/material-interface';

@Component({
  selector: 'app-sua-san-pham',
  templateUrl: './sua-san-pham.component.html',
  styleUrls: ['./sua-san-pham.component.css']
})
export class SuaSanPhamComponent implements OnInit {
  categories: CategoryInterface[] = [];
  brand: BrandInterface[] = [];
  sole: SoleInterface[] = [];
  material: MaterialInterface[] = [];
  rowData = [];
  constructor( public dialogRef: MatDialogRef<SuaSanPhamComponent>,
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
  clickUpdate(id: number){
    const product = {
      code: this.data.code,
      name: this.data.name,
      updateName: this.data.updateName,
      idBrand: this.data.idBrand,
      idMaterial: this.data.idMaterial,
      idSole: this.data.idSole,
      idCategory: this.data.idCategory,
      description: this.data.description,
      status: this.data.status,
      price: this.data.price
    };
    this.prdsv.UpdateProduct(id, product).subscribe(
      result => {
        console.log('product add success', result);
        this.dialogRef.close('saveProduct');
      },
      error => {
        console.error('product add error', error);
      }
    );
  }

}
