import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActionDiscountComponent} from './action-discount/action-discount.component';
import {DiscountService} from '../../service/discount.service';
import {formatDate, formatDateTime, formatDateYYYY_MM_dd} from '../../util/util';
import {FormControl, FormGroup} from '@angular/forms';
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit {
  rowData: any = [];
  rowData1: any = [];
  rowData2: any = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  checkedIsdel = false;
  loc = '0';
  export = '0';
  idStaff = '';
  role: '';
  dateFromCurrent = null;
  dateToCurrent = null;
  searchResults: any[] = [];

  // isValidDateRange = () => {
  //   return (
  //     this.startDate &&
  //     this.endDate &&
  //     new Date(this.startDate) < new Date(this.endDate)
  //   );
  // }
  constructor(private apiService: DiscountService, private cdr: ChangeDetectorRef,
              private toastr: ToastrService) {
    this.columnDefs = [
      {
        headerName: 'Mã',
        field: 'code',
        sortable: true,
        filter: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Tên',
        field: 'name',
        sortable: true,
        filter: true,
        minWidth: 70,
        maxWidth: 80,
      },
      {
        headerName: 'Ngày bắt đầu',
        field: 'startDate',
        sortable: true,
        filter: true,
        minWidth: 80,
        valueGetter: params => {
          return `${formatDateTime(params.data.startDate)}`;
        }
      },
      {
        headerName: 'Ngày kết thúc',
        field: 'endDate',
        sortable: true,
        filter: true,
        minWidth: 80,
        valueGetter: params => {
          return `${formatDateTime(params.data.endDate)}`;
        }
      },
      {
        headerName: 'Trạng thái',
        field: 'status',
        sortable: true,
        filter: true,
        cellRenderer: this.statusRenderer.bind(this),
      },
      {
        headerName: 'Số lượng sản phẩm đã áp dụng',
        valueGetter: (params) => {
          const useDiscount = params.data.used_count || 0;
          return `${useDiscount}`;
        }
      },
      {
        headerName: 'Hiển thị',
        field: '',
        cellRenderer: (params) => {
          const isChecked = params.data.idel === 1;
          return `<div>
      <label class="switch1">
        <input type="checkbox" ${isChecked ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>`;
        },
        onCellClicked: (params) => {
          this.checkIsdell(params.node.data);
        }
      },
      {
        headerName: 'Action',
        field: '',
        cellRendererFramework: ActionDiscountComponent,
        pinned: 'right',
      },
    ];
  }

  // Định nghĩa Cell Renderer ở mức lớp
  statusRenderer(params) {
    if (params.value === 0) {
      return 'Còn hạn';
    } else if (params.value === 1) {
      return 'Hết hạn';
    } else {
      return 'Không rõ';
    }
  }

  ngOnInit(): void {
    this.apiService.getSomeData().subscribe((response) => {
      this.rowData = response;
      this.searchResults = response;
      console.log(response);
    });
    this.apiService.getDiscountKH().subscribe((response) => {
      this.rowData1 = response;
    });
    this.apiService.getDiscountKKH().subscribe((response) => {
      this.rowData2 = response;
      console.log(response);
    });
    this.role = JSON.parse(localStorage.getItem('role'));
    console.log(this.dateFromCurrent);
    console.log(this.dateToCurrent);
  }

  checkIsdell(data: any) {
    if (data.idel === 0) {
      const userConfirmed = confirm('Bạn có muốn kích hoạt giảm giá không?');
      if (!userConfirmed) {
        return;
      }
      // Truyền dữ liệu thông qua HTTP PUT request
      this.apiService.KichHoat(data.id).subscribe(
        (res) => {
          this.toastr.success('Kích hoạt thành công');
          this.searchResults = res;
        },
        error => {
          this.toastr.error('Kích hoạt thất bại');
        });
    } else {
      const userConfirmed = confirm('Bạn có muốn hủy bỏ kích hoạt giảm giá không?');
      if (!userConfirmed) {
        return;
      }
      // Truyền dữ liệu thông qua HTTP PUT request
      this.apiService.KichHoat(data.id).subscribe(res => {
          this.toastr.success('Hủy bỏ kích hoạt thành công');
          this.searchResults = res;
        },
        error => {
          this.toastr.error('Hủy bỏ kích hoạt thất bại');
        });
    }
    this.cdr.detectChanges();
  }
  searchByCategory(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByCategory(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  searchByProduct(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByProduct(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  searchByBrand(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByBrand(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  searchByDiscount(event: any) {
    const searchTerm = event.target.value;
    this.apiService.searchByDiscount(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  test(event: any) {
    console.log('data event: ', event);
  }
  searchByDate(obj) {
    const dateRange = {
      fromDate: obj.dateFrom,
      toDate: obj.dateTo
    };

    this.apiService.searchByDate(dateRange).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error('Error occurred during date range search:', error);
        // You can provide a user-friendly error message here if needed
      }
    );
    this.cdr.detectChanges();
  }
  getDater(data) {
    console.log(data);
    if (data.startDate && data.endDate){
      this.dateFromCurrent = data.startDate;
      this.dateToCurrent = data.endDate;
      const obj = {
        dateFrom: formatDate(this.dateFromCurrent),
        dateTo: formatDate(this.dateToCurrent)
      };
      this.searchByDate(obj);
    }else {
      this.ngOnInit();
    }
  }
}
