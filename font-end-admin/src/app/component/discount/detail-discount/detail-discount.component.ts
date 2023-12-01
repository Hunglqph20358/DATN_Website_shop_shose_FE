import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/service/discount.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detail-discount',
  templateUrl: './detail-discount.component.html',
  styleUrls: ['./detail-discount.component.css']
})
export class DetailDiscountComponent implements OnInit {

  discount: any = {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      productDTOList: [],
    optionCustomer: '',
    reducedValue: '',
    discountType: '',
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
        .subscribe((response: any) => {
          const firstDiscount = Array.isArray(response) ? response[0] : response;
          this.discount.name =
            firstDiscount.name;
          this.discount.description =
            firstDiscount.description;
          this.discount.startDate =
            firstDiscount.startDate;
          this.discount.endDate =
            firstDiscount.endDate;
          this.discount.discountType = firstDiscount.discountType;
          this.discount.reducedValue = firstDiscount.reducedValue;
          this.discount.productDTOList = firstDiscount.productDTOList;

          // Log the discount data after it has been fetched
          console.log(this.discount);
        });
    });
    // Avoid logging here, as it will execute before the HTTP request completes
  }
}
