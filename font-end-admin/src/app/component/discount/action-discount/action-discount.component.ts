import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ICellRendererParams} from "ag-grid-community";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {CreatDiscountComponent} from "../creat-discount/creat-discount.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-action-discount',
  templateUrl: './action-discount.component.html',
  styleUrls: ['./action-discount.component.css']
})
export class ActionDiscountComponent implements OnInit , ICellRendererAngularComp{
  isMenuOpen: boolean = false;
  data: any;
  constructor(private  matDialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.data = params.data;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  editItem(): void {
   this.router.navigate(['/admin/sua-giam-gia/a']);
  }

  deleteItem(): void {
    // Xử lý khi nút "Delete" được nhấn
  }

}
