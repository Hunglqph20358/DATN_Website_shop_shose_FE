import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {BrandService} from "../../../service/brand.service";
import {CategoryService} from "../../../service/category.service";
import {MaterialpostService} from "../../../service/materialpost.service";
import {SoleService} from "../../../service/sole.service";

@Component({
  selector: 'app-them-san-pham',
  templateUrl: './them-san-pham.component.html',
  styleUrls: ['./them-san-pham.component.css']
})
export class ThemSanPhamComponent implements OnInit {

  constructor(private prdsv: ProductService,
              private brsv: BrandService,
              private ctgrsv: CategoryService,
              private mtsv: MaterialpostService,
              private slsv: SoleService) { }

  ngOnInit(): void {
    this.brsv.getAllBrand().subscribe()
  }

}
