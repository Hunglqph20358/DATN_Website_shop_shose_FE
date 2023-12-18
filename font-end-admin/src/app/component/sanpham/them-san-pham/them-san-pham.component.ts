import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../../../service/product.service';
import {BrandService} from '../../../service/brand.service';
import {CategoryInterface} from '../../../interface/category-interface';
import {CategoryService} from '../../../service/category.service';
import {BrandInterface} from '../../../interface/brand-interface';
import {SoleService} from '../../../service/sole.service';
import {MaterialpostService} from '../../../service/materialpost.service';
import {SoleInterface} from '../../../interface/sole-interface';
import {MaterialInterface} from '../../../interface/material-interface';
import {Router} from '@angular/router';
import {CommonFunction} from '../../../util/common-function';
import {ValidateInput} from '../../model/validate-input';
import {ImageService} from '../../../service/image.service';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})
export class ThemSanPhamComponent implements OnInit {
  image: File | null = null;
  validName: ValidateInput = new ValidateInput();
  validBrand: ValidateInput = new ValidateInput();
  validCategory: ValidateInput = new ValidateInput();
  validSole: ValidateInput = new ValidateInput();
  validMaterial: ValidateInput = new ValidateInput();
  validPrice: ValidateInput = new ValidateInput();
  validDescription: ValidateInput = new ValidateInput();
  validImage: ValidateInput = new ValidateInput();
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
  Status: number = 0;
  categories: CategoryInterface[] = [];
  brand: BrandInterface[] = [];
  sole: SoleInterface[] = [];
  material: MaterialInterface[] = [];
  idnv: string;
  imgLst;
  image1;
  imagediv;
  newimg;

  constructor(private prdsv: ProductService,
              private brsv: BrandService,
              private ctsv: CategoryService,
              private slsv: SoleService,
              private mtsv: MaterialpostService,
              private router: Router,
              private imageService: ImageService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getALLBrand();
    this.getAllCategory();
    this.getAllMaterial();
    this.getAllSole();
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

  OnChangeFile(event: any) {
    console.log(event);
    // this.image1 = URL.createObjectURL(event.target.file.length[0]);
    // this.imagediv = document.getElementById('preview');
    // this.newimg = document.createElement('img');
    // this.newimg.src = this.image1;
    // this.imagediv.appendChild(this.newimg);
    this.imgLst = new FormData();
    // for (let i = 0; i < event.target.files.length; i++){
    //   this.imgLst.append('file' + i, event.target.files[i]);
    //   console.log(this.imgLst);
    // }

    if (event.target.files.length > 0) {
      // const file = ;
      // const  formData = new FormData();
      for (let i = 0; i < event.target.files.length; i++) {
        this.imgLst.append('file', event.target.files[i]);
      }
      // console.log(formData);
      // for (const entry of this.imgLst.entries()) {
      //   const [key, value] = entry;
      //   // tslint:disable-next-line:no-shadowed-variable
      //   const file: File = value as File;
      //   console.log(`Key: ${key}, FileName: ${file.name}, FileSize: ${file.size} bytes`);
      // }
    }

  }

  clickaddProduct() {
    this.Name = CommonFunction.trimText(this.Name);
    this.Description = CommonFunction.trimText(this.Description);
    this.Price = CommonFunction.trimText(this.Price);
    this.validateName();
    this.validateDescription();
    this.validatePrice();
    this.validateBrand();
    this.validateCategory();
    this.validateSole();
    this.validateMaterial();
    this.validateImage();
    if (!this.validName.done || !this.validDescription.done || !this.validPrice.done || !this.validBrand
      || !this.validCategory.done || !this.validSole.done || !this.validMaterial.done
      // || !this.validImage.done
    ) {
      return;
    }
    Swal.fire({
      title: 'Bạn muốn thêm?',
      text: 'Thao tác này sẽ không hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Thêm!'
    }).then((result1) => {
      if (result1.isConfirmed) {
        this.idnv = localStorage.getItem('id');
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
          price: this.Price,
          idnv: this.idnv,
        };
        this.prdsv.CreateProduct(products).subscribe(
          result => {
            this.prdsv.uploadImgProduct(this.imgLst, result.data.id).subscribe(res => {
              console.log('đã vào đây');
            });
            this.router.navigate(['admin/san-pham']);
            console.log('Product add success', result);
          },
          error => {
            console.error('Product add error', error);
          }
        );
        Swal.fire({
          title: 'Thêm!',
          text: 'Thêm thành công',
          icon: 'success'
        });
      }
    });
  }

  revoveInvalid(result) {
    result.done = true;
  }

  validateName() {
    this.validName = CommonFunction.validateInput(this.Name, 250, null);
  }

  validateDescription() {
    this.validDescription = CommonFunction.validateInput(this.Description, 250, null);
  }

  validatePrice() {
    this.validPrice = CommonFunction.validateInput(this.Price, 250, '^[0-9]+$');
  }

  validateBrand() {
    this.validBrand = CommonFunction.validateInput(this.IdBrand, 250, null);
  }

  validateCategory() {
    this.validCategory = CommonFunction.validateInput(this.IdCategory, 250, null);
  }

  validateSole() {
    this.validSole = CommonFunction.validateInput(this.IdSole, 250, null);
  }

  validateMaterial() {
    this.validMaterial = CommonFunction.validateInput(this.IdMaterial, 250, null);
  }

  validateImage() {
    this.validImage = CommonFunction.validateInput(this.imgLst, 250, null);
  }

}
