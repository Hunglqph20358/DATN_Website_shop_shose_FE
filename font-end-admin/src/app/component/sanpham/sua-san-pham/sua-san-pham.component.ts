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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sua-san-pham',
  templateUrl: './sua-san-pham.component.html',
  styleUrls: ['./sua-san-pham.component.css']
})
export class SuaSanPhamComponent implements OnInit {
  product: any = {
    code: null,
    name: null,
    idBrand: null,
    idCategory: null,
    idMaterial: null,
    description: null,
    status: null,
    idSole: null,
    price: null,
  };
  idProduct: any;
  categories: CategoryInterface[] = [];
  brand: BrandInterface[] = [];
  sole: SoleInterface[] = [];
  material: MaterialInterface[] = [];
  rowData = [];
  data: any;

  constructor(private prdsv: ProductService,
              private brsv: BrandService,
              private ctsv: CategoryService,
              private slsv: SoleService,
              private mtsv: MaterialpostService, private router: Router,
              private route: ActivatedRoute) {
    this.idProduct = +this.route.snapshot.paramMap.get('idProduct');
  }

  ngOnInit(): void {
    this.getALLBrand();
    this.getAllCategory();
    this.getAllMaterial();
    this.getAllSole();
    this.getProductDetails(this.idProduct);
    console.log('data', this.product.code);
  }

  getProductDetails(productId: number): void {
    this.prdsv.GetProduct(productId).subscribe((result) => {
        this.product.code = result.data.code;
        this.product.name = result.data.name;
        this.product.idBrand = result.data.idBrand;
        this.product.idCategory = result.data.idCategory;
        this.product.idMaterial = result.data.idMaterial;
        this.product.idSole = result.data.idSole;
        this.product.description = result.data.description;
        this.product.price = result.data.price;
        this.product.status = result.data.status;
        console.log(this.product.code);
        console.log(result.data.code);
      },
      error => {
        console.error('Error retrieving product details:', error);
      }
    );
  }

  getALLBrand() {
    this.brsv.getAllBrand().subscribe(res => {
      this.brand = res;
    });
  }

  getAllCategory() {
    this.ctsv.getAllCategory().subscribe(res => {
      this.categories = res;
    });
  }

  getAllSole() {
    this.slsv.getAllSole().subscribe(res => {
      this.sole = res;
    });
  }

  getAllMaterial() {
    this.mtsv.getAllMaterial().subscribe(res => {
      this.material = res;
    });
  }

  clickUpdate(id: number) {
    const product = {
      code: this.product.code,
      name: this.product.name,
      idBrand: this.product.idBrand,
      idMaterial: this.product.idMaterial,
      idSole: this.product.idSole,
      idCategory: this.product.idCategory,
      description: this.product.description,
      status: this.product.status,
      price: this.product.price
    };
    this.prdsv.UpdateProduct(id, product).subscribe(
      result => {
        console.log('product add success', result);
        this.router.navigateByUrl('admin/san-pham');
      },
      error => {
        console.error('product add error', error);
      }
    );
  }

}
