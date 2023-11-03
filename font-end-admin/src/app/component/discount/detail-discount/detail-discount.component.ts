import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/service/discount.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-detail-discount',
  templateUrl: './detail-discount.component.html',
  styleUrls: ['./detail-discount.component.css']
})
export class DetailDiscountComponent implements OnInit {

  discount: any = {
    discountAdminDTO: {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    reducedValue: '',
    discountType: '',
    productDTOList: [],
  };

  constructor(private discountService: DiscountService,
              private router: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.router.params.subscribe((params) => {
      const id = params['id'];
      console.log(id);
      this.discountService
        .getDetailDiscount(id)
        .subscribe((response: any[]) => {
          const firstDiscount = response[0];
          this.discount.discountAdminDTO.name =
            firstDiscount.discountAdminDTO.name;
          this.discount.discountAdminDTO.description =
            firstDiscount.discountAdminDTO.description;
          this.discount.discountAdminDTO.startDate =
            firstDiscount.discountAdminDTO.startDate;
          this.discount.discountAdminDTO.endDate =
            firstDiscount.discountAdminDTO.endDate;
          this.discount.discountType = firstDiscount.discountType;
          this.discount.reducedValue = firstDiscount.reducedValue;
          this.discount.productDTOList = firstDiscount.productDTOList;
        });
    });
    console.log(this.discount);
  }
}
