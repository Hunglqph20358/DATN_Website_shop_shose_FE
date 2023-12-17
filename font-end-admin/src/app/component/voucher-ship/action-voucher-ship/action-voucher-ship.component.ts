import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {VoucherService} from "../../../service/voucher.service";
import {ICellRendererParams} from "ag-grid-community";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-action-voucher-ship',
  templateUrl: './action-voucher-ship.component.html',
  styleUrls: ['./action-voucher-ship.component.css']
})
export class ActionVoucherShipComponent implements OnInit, ICellRendererAngularComp {
  isMenuOpen: boolean = false;
  data: any;
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private voucherService: VoucherService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
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
    this.router.navigate(['/admin/edit-voucherFS', this.data.id]);
  }

  deleteItem(): void {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa dòng này?');
    if (confirmation) {
      this.voucherService.deleteVoucher(this.data.id)
        .subscribe(() => {
          this.toastr.success('Xóa thành công');
          this.router.navigateByUrl('/admin/voucherFS');
          },
          (error) => {
            this.toastr.error('Xóa thất bại');
            console.error('Error delete discount', error);
          });
    }
    this.cdr.detectChanges();
  }
  detail(): void {
    this.router.navigate(['/admin/voucherFS', this.data.id]);
  }
}

