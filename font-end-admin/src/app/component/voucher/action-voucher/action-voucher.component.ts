import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ICellRendererParams} from "ag-grid-community";
import {Router} from "@angular/router";

@Component({
  selector: 'app-action-voucher',
  templateUrl: './action-voucher.component.html',
  styleUrls: ['./action-voucher.component.css']
})
export class ActionVoucherComponent implements OnInit {

  private params: any;
  isMenuOpen: boolean = false;

  constructor(private  matDialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editItem(): void {
    this.router.navigate(['/admin/sua-voucher']);
  }

  deleteItem(): void {
    // Xử lý khi nút "Delete" được nhấn
  }


}
