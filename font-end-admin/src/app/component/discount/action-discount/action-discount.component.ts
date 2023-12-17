import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { CreatDiscountComponent } from '../creat-discount/creat-discount.component';
import { DetailDiscountComponent } from '../detail-discount/detail-discount.component';
import { DiscountService } from 'src/app/service/discount.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-action-discount',
  templateUrl: './action-discount.component.html',
  styleUrls: ['./action-discount.component.css'],
})
export class ActionDiscountComponent
  implements OnInit, ICellRendererAngularComp
{
  isMenuOpen: boolean = false;
  data: any = {
    // discountAdminDTO: {
    //   id: '',
    //   name: '',
    //   startDateStr: '',
    //   endDateStr: '',
    //   description: '',
    // },
    // reducedValue: '',
    // discountType: '',
  };
  gridApi: GridApi; // Thêm gridApi để truy cập Ag-Grid API
  constructor(private matDialog: MatDialog, private router: Router,
              private discountService: DiscountService,
              private cdr: ChangeDetectorRef,
              private toastr: ToastrService) {}
  ngOnInit(): void {
    console.log(this.data.idDiscount);
  }

  agInit(params): void {
    this.data = params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  editItem(): void {
    console.log(this.data);
    this.router.navigate(['/admin/edit-discount', this.data.id]);
  }
  detail(): void {
    this.router.navigate(['/admin/discount', this.data.id]);
  }
  delete(): void {
    if (confirm('Bạn có muốn xóa không?')) {
      this.discountService.deleteDiscount(this.data.id).subscribe((response) => {
        // Xử lý phản hồi nếu cần, ví dụ: hiển thị thông báo thành công
        this.toastr.success('Xóa giảm giá thành công');
        this.router.navigateByUrl('/admin/discount');
      },
        error => {
          this.toastr.error('Xóa giảm giá thất bại');
        });
    }
    this.cdr.detectChanges();
  }


}
