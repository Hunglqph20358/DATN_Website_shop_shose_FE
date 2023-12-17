import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscountService } from 'src/app/service/discount.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.css'],
})
export class EditDiscountComponent implements OnInit {
   isHidden = true;
  discount: any = {
    discountAdminDTO: {
      id: '',
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      createName: localStorage.getItem('fullname'),
    },
    spap: '',
    reducedValue: '',
    discountType: '',
    maxReduced: '',
    isValidDateRange: () => {
      return (
        this.discount.discountAdminDTO.startDate &&
        this.discount.discountAdminDTO.endDate &&
        this.discount.discountAdminDTO.startDate < this.discount.discountAdminDTO.endDate
      );
    },
  };
  gridApi: any;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  disableCheckPriceProduct = false;
  iđStaff = '';

  constructor(private discountService: DiscountService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
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
        field: 'brandAdminDTO.name',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Loại',
        field: 'categoryAdminDTO.name',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Giá',
        field: 'price',
        sortable: true,
        filter: true,
        editable: true,
      },
      {
        headerName: 'Số lượt bán',
        field: 'totalQuantity',
        sortable: true,
        filter: true,
        editable: true,
      },
    ];
  }
  currentDate: Date = new Date();
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  ngOnInit(): void {
    this.discountService.getProduct().subscribe((response) => {
      this.rowData = response;
      console.log(response);
    });
    this.isHidden = true;
    // Lấy thông tin khuyến mãi dựa trên id từ tham số URL
    this.activatedRoute.params.subscribe((params) => {
      const id = params.id;
      this.discountService
        .getDetailDiscount(id)
        .subscribe((response: any[]) => {
          const firstDiscount = Array.isArray(response) ? response[0] : response;
          this.discount.discountAdminDTO.id = firstDiscount.id;
          this.discount.discountAdminDTO.name =
            firstDiscount.name;
          this.discount.discountAdminDTO.startDate =
            firstDiscount.startDate;
          this.discount.discountAdminDTO.endDate =
            firstDiscount.endDate;
          this.discount.discountAdminDTO.description =
            firstDiscount.description;
          this.discount.reducedValue = firstDiscount.reducedValue;
          this.discount.discountType = firstDiscount.discountType;
          this.discount.maxReduced = firstDiscount.maxReduced;

          console.log(this.discount);
        });
    });
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  // Phương thức cập nhật thông tin khuyến mãi
  editDiscount() {
    const arrayProduct = this.discount.spap === '0' ? this.rowData : this.gridApi.getSelectedRows();
    this.disableCheckPriceProduct = false;
    const userConfirmed = confirm('Bạn có muốn sửa giảm giá không?');
    if (!userConfirmed) {
      return;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrayProduct.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.discount.reducedValue > arrayProduct[i].price && this.discount.discountType == 1) {
        this.disableCheckPriceProduct = true;
        alert('Giá trị giảm lớn hơn giá sản phẩm');
        return;
      }
      this.iđStaff = localStorage.getItem('idStaff');
      // tslint:disable-next-line:triple-equals
      if (this.discount.maxReduced > arrayProduct[i].price && this.discount.discountType == 0) {
        this.disableCheckPriceProduct = true;
        alert('Giá trị giảm lớn hơn giá sản phẩm');
        return;
      }
    }
    if (this.disableCheckPriceProduct === false) {
      const obj = {
        ...this.discount,
        productDTOList: arrayProduct,
      };
      this.discountService.updateDiscount(this.discount.discountAdminDTO.id, obj).subscribe(
        (response) => {
          // Handle the response if needed, e.g., show a success message
          console.log('Discount added successfully', response);
          this.toastr.success('Sửa giảm giá thành công');
          this.router.navigateByUrl('/admin/discount');
        },
        (error) => {
          // Handle errors if the discount creation fails
          this.toastr.success('Sửa giảm giá thất bại');
          console.error('Error adding discount', error);
        }
      );
    }
  }
}
