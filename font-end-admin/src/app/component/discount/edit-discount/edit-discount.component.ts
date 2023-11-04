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
    id: '',
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
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;

  constructor(private discountService: DiscountService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.columnDefs = [
      {
        headerName: 'Mã sản phẩm',
        field: 'code',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        editable: true,
      },
      {
        headerName: 'Tên sản phẩm',
        field: 'name',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Tên thương hiệu',
        field: 'brandDTO.name',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Loại',
        field: 'categoryDTO.name',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Số lượt bán',
        field: 'totalSold',
        sortable: true,
        filter: true,
        editable: true,
      },
    ];
  }
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  ngOnInit(): void {
    this.discountService.getProduct().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
    this.isHidden = true;
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.discountService
        .getDetailDiscount(id)
        .subscribe((response: any[]) => {
          const firstDiscount = response[0];
          this.discount.id = firstDiscount.id;
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
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(this.gridApi.getSelectedRows());
      const obj = {
        ...this.discount,
        productDTOList: this.gridApi.getSelectedRows(),
      };
      this.discountService
        .updateDiscount(id, obj)
        .subscribe(() => {
          this.router.navigateByUrl('/admin/discount');
        });
      console.log(obj);
    });
  }
}
