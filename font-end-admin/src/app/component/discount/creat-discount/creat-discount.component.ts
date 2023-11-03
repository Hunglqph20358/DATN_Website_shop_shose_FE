import {Component, OnInit, ViewChild} from '@angular/core';
import {NgModule} from '@angular/core';
import {DiscountService} from '../../../service/discount.service';
import {AgGridAngular} from 'ag-grid-angular';
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
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  addDiscount() {
    console.log(this.gridApi.getSelectedRows());
    const obj = {
      ...this.discount,
      productDTOList: this.gridApi.getSelectedRows(),
    };
    this.discountService.createDiscount(obj).subscribe(
      (response) => {
        // Handle the response if needed, e.g., show a success message
        console.log('Discount added successfully', response);
      },
      (error) => {
        // Handle errors if the discount creation fails
        console.error('Error adding discount', error);
      }
    );
    this.router.navigateByUrl("/admin/discount");
  }
}
