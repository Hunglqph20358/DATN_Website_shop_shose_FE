import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { VoucherService } from 'src/app/service/voucher.service';
import { DetailVoucherComponent } from '../detail-voucher/detail-voucher.component';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'app-action-voucher',
  templateUrl: './action-voucher.component.html',
  styleUrls: ['./action-voucher.component.css'],
})
export class ActionVoucherComponent implements OnInit, ICellRendererAngularComp {
  isMenuOpen: boolean = false;
  data: any;
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private voucherService: VoucherService
  ) {}
  ngOnInit(): void {
    console.log(this.data.id);
  }
  agInit(params): void {
    this.data = params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  editItem(): void {
    console.log(this.data);
    this.router.navigate(['/admin/edit-voucher', this.data.id]);
  }

  deleteItem(): void {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa dòng này?');
    if (confirmation) {
      this.voucherService.deleteVoucher(this.data.id)
        .subscribe(() => {
            this.router.navigateByUrl('/admin/voucher');
          },
          (error) => {
            console.error('Error delete discount', error);
          });
    }
  }
  detail(): void {
    this.router.navigate(['/admin/voucher', this.data.id]);
  }
}
