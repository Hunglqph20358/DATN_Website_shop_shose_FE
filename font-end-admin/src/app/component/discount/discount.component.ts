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
  idStaff: string = '';
  // today = new Date();
  // month = today.getMonth();
  // year = today.getFullYear();
  searchName: '';
  // campaignOne = new FormGroup({
  //   start: new FormControl(new Date()),
  //   end: new FormControl(new Date()),
  // });
  searchResults: any[] = [];

  constructor(private apiService: DiscountService) {
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

  // Tạo một biến để lưu trữ danh sách hiện tại

  search(searchTerm: string) {
    // Thực hiện tìm kiếm và cập nhật searchResults
    this.apiService.searchByName(searchTerm).subscribe(
      (data) => {
        this.searchResults = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    this.search(searchTerm);
  }

  searchByDateRange(startDate: Date, endDate: Date): void {
    // this.apiService.searchByDateRange(start, end)
    //   .subscribe({
    //     next: data => {
    //       // Xử lý dữ liệu trả về từ API
    //       console.log(data);
    //     },
    //     error: error => {
    //       // Xử lý lỗi
    //       console.error(error);
    //     }
    //   });
  }


  test(event: any) {
    console.log('data event: ', event);
  }
}
