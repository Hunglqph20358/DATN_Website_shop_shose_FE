import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModule} from '@angular/core';
import {DiscountService} from '../../../service/discount.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-creat-discount',
  templateUrl: './creat-discount.component.html',
  styleUrls: ['./creat-discount.component.css'],
})
export class CreatDiscountComponent implements OnInit {
  discount: any = {
    discountAdminDTO: {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      appy: '',
      createName: localStorage.getItem('fullname'),
    },
    spap: '',
    reducedValue: '',
    discountType: '',
    maxReduced: '',
    isValidDateRange: () => {
      // Your logic to check the validity of the date range
      // For example:
      return (
        this.discount.discountAdminDTO.startDate &&
        this.discount.discountAdminDTO.endDate &&
        this.discount.discountAdminDTO.startDate < this.discount.discountAdminDTO.endDate
      );
    },
  };
  fullname: string = '';
  gridApi: any;
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  disableCheckPriceProduct: boolean = false;
  iđStaff: string = '';
  constructor(private discountService: DiscountService,
              private router: Router) {
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
        headerName: 'Giá',
        field: 'price',
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
      debugger
      console.log(response);
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  // isValidDateRange: () => {
  //   // Your logic to check the validity of the date range
  //   // For example:
  //   return (
  //     this.discount.discountAdminDTO.startDate &&
  //   this.discount.discountAdminDTO.endDate &&
  //   this.discount.discountAdminDTO.startDate < this.discount.discountAdminDTO.endDate
  //   );
  // }

  addDiscount() {
    const arrayProduct = this.discount.spap === '0' ? this.rowData : this.gridApi.getSelectedRows();
    this.disableCheckPriceProduct = false;
    for (let i = 0; i < arrayProduct.length; i++) {
      if (this.discount.reducedValue > arrayProduct[i].price && this.discount.discountType == 1) {
        this.disableCheckPriceProduct = true;
        alert('Giá trị giảm lớn hơn giá sản phẩm');
        return;
      }
      this.iđStaff = localStorage.getItem('idStaff');
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
      this.discountService.createDiscount(obj).subscribe(
        (response) => {
          // Handle the response if needed, e.g., show a success message
          console.log('Discount added successfully', response);
          this.router.navigateByUrl('/admin/discount');
        },
        (error) => {
          // Handle errors if the discount creation fails
          console.error('Error adding discount', error);
        }
      );
    }
  }

}
