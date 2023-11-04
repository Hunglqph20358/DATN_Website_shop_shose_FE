import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { CreatDiscountComponent } from '../creat-discount/creat-discount.component';
import { DetailDiscountComponent } from '../detail-discount/detail-discount.component';
import { DiscountService } from 'src/app/service/discount.service';

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
              private discountService: DiscountService) {}
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

  deleteItem(): void {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa dòng này?');
    if (confirmation) {
      this.discountService.deleteDiscount(this.data.id)
        .subscribe(() => {
            this.router.navigateByUrl('/admin/discount');
          },
          (error) => {
            console.error('Error delete discount', error);
          });
    }
  }

  detail(): void {
    this.router.navigate(['/admin/discount', this.data.id]);
  }

}
