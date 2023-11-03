import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/service/discount.service';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css'],
})
export class EditDiscountComponent implements OnInit {
   isHidden: boolean = true;
  discount: any = {
    discountAdminDTO: {
      id: '',
      name: '',
      startDateStr: '',
      endDateStr: '',
      description: '',
    },
    reducedValue: '',
    discountType: '',
  };
  gridApi: any;
  constructor(
    private discountService: DiscountService,
    private router: ActivatedRoute,
    private rou: Router
  ) {}
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  ngOnInit(): void {
    this.isHidden = true;
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.discountService
        .getDetailDiscount(id)
        .subscribe((response: any[]) => {
          const firstDiscount = response[0];
          this.discount.discountAdminDTO.id = firstDiscount.discountAdminDTO.id;
          this.discount.discountAdminDTO.name =
            firstDiscount.discountAdminDTO.name;
          this.discount.discountAdminDTO.startDate =
            firstDiscount.discountAdminDTO.startDate;
          this.discount.discountAdminDTO.endDate =
            firstDiscount.discountAdminDTO.endDate;
          this.discount.discountAdminDTO.description =
            firstDiscount.discountAdminDTO.description;
          this.discount.reducedValue = firstDiscount.reducedValue;
          this.discount.discountType = firstDiscount.discountType;

          console.log(this.discount);
        });
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  // Phương thức cập nhật thông tin khuyến mãi
  editDiscount() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      console.log(this.gridApi.getSelectedRows());
      const obj = {
        ...this.discount,
      };
      this.discountService
        .updateDiscount(id, obj)
        .subscribe(() => {
          this.rou.navigateByUrl('/admin/discount');
        });
      console.log(obj);
    });
  }
}
