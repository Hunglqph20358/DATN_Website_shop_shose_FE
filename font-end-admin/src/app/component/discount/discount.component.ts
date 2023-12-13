import {Component, OnInit} from '@angular/core';
import {ActionDiscountComponent} from './action-discount/action-discount.component';
import {DiscountService} from '../../service/discount.service';
import {formatDateTime} from '../../util/util';
import {FormControl, FormGroup} from '@angular/forms';


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
  idStaff = '';
  dateFromCurrent;
  dateToCurrent;
  searchResults: any[] = [];

  // isValidDateRange = () => {
  //   return (
  //     this.startDate &&
  //     this.endDate &&
  //     new Date(this.startDate) < new Date(this.endDate)
  //   );
  // }
  constructor(private apiService: DiscountService) {
    const currentDate = new Date();
    this.dateFromCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    this.dateToCurrent = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
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
        headerName: 'Đã sử dụng',
        valueGetter: (params) => {
          const useDiscount = params.data.used_count || 0;
          const quantity = params.data.quantity || 1;
          return `${useDiscount} / ${quantity}`;
        }
      },
      {
        headerName: 'Hiển thị',
        field: '',
        cellRenderer: (params) => {
          return `<div>
      <label class="switch1">
        <input type="checkbox" ${params.data.idel === 1 ? 'checked' : ''}>
        <span class="slider round"></span>
      </label>
    </div>`;
        },
        onCellClicked: (params) => {
          // Use params.node.data to access the data property
          return this.checkIsdell(params.node.data);
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
    this.getDiscount();
    console.log(this.dateFromCurrent);
    console.log(this.dateToCurrent);
  }

  checkIsdell(data: any) {
    console.log('ID to be sent:', data.id);

    // Truyền dữ liệu thông qua HTTP PUT request
    this.apiService.KichHoat(data.id).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.rowData = response;
        } else {
          console.error('Invalid response format:', response);
        }
      },
      (error) => {
        console.error('Error in HTTP PUT request:', error);
      }
    );
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

  searchByDate(startDate: string, endDate: string) {
    if (startDate && endDate) {
      // Assuming your API service accepts a date range for searching
      const dateRange = { startDate, endDate };

      // @ts-ignore
      this.apiService.searchByDate(dateRange).subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error occurred during date range search:', error);
          // You can provide a user-friendly error message here if needed
        }
      );
    } else {
      console.warn('Invalid date range.');
      // Optionally, you can provide feedback to the user that the date range is invalid
    }
  }



  test(event: any) {
    console.log('data event: ', event);
  }
  getDiscount() {
    const obj = {
      dateFrom: formatDateYYYY_MM_dd(this.dateFromCurrent),
      dateTo: formatDateYYYY_MM_dd(this.dateToCurrent)
    };
    this.apiService.searchByDate(obj).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error('Error occurred during date range search:', error);
        // You can provide a user-friendly error message here if needed
      }
    );
}
  getDater(data) {
    console.log(data);
    if(data.startDate && data.endDate){
      this.dateFromCurrent = data.startDate;
      this.dateToCurrent = data.endDate;
      this.getDiscount();
    }
  }
}
