import { Component, OnInit } from '@angular/core';
import {ThemDanhMucComponent} from "./them-danh-muc/them-danh-muc.component";
import {SuaDanhMucComponent} from "./sua-danh-muc/sua-danh-muc.component";
import {CategoryService} from "../../service/category.service";
import {MatDialog} from "@angular/material/dialog";
import {ActionCategoryRedererComponent} from "./action-category-rederer/action-category-rederer.component";


@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private ctsv: CategoryService,
              ) {
    this.columnDefs = [
      {headerName: 'Tên', field: 'name', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true},
      {headerName: 'Ngày bắt đầu', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Ngày Sửa ', field: 'updateDate', sortable: true, filter: true},
      {headerName: 'Trạng thái', field: 'status', sortable: true, filter: true},
      {headerName: 'Actions', field: '', cellRendererFramework: ActionCategoryRedererComponent}];
  }

  ngOnInit(): void {
    this.getCategory();
  }
  getCategory() {
    this.ctsv.getAllCategory().subscribe(data => {
      this.rowData = data;
    });
  }
  openAdd(){
    const dialogRef = this.matdialog.open(ThemDanhMucComponent, {
      width: '60vh',
      height: '60vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCategory(result);
      }
    });
  }
  openUpdate(){
    this.matdialog.open(SuaDanhMucComponent, {
      width: '60vh',
      height: '60vh'
    });
  }
  createCategory(category: any) {
    this.ctsv.AddCategory(category).subscribe(() => {
      this.getCategory();
    });
  }
  updateProduct(category: any) {
    this.ctsv.UpdateCategory(category.id, category).subscribe(() => {
      this.getCategory();
    });
  }
  deleteProduct(params: any) {
    const category = params.data;
    this.ctsv.DeleteCategory(category.id).subscribe(() => {
      this.getCategory();
    });
  }

}
