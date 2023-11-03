import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemMauSacComponent} from "./them-mau-sac/them-mau-sac.component";
import {SuaMauSacComponent} from "./sua-mau-sac/sua-mau-sac.component";
import {MausacService} from "../../service/mausac.service";
import {ActionVoucherComponent} from "../voucher/action-voucher/action-voucher.component";

@Component({
  selector: 'app-mausac',
  templateUrl: './mausac.component.html',
  styleUrls: ['./mausac.component.css']
})
export class MausacComponent implements OnInit {
  rowData = [];
  columnDefs;
  headerHeight = 50;
  rowHeight = 40;
  public rowSelection: 'single' | 'multiple' = 'multiple'; // Chọn nhiều dòng
  constructor(private matdialog: MatDialog,
              private mssv: MausacService) {
    this.columnDefs = [
      {
        headerName: 'ColorName',
        field: 'name',
        sortable: true,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelection: true
      },
      {headerName: 'CreateDate', field: 'createDate', sortable: true, filter: true},
      {headerName: 'Action', field: '', cellRendererFramework: ActionVoucherComponent},
    ];
  }

  ngOnInit(): void {
    this.mssv.getAllMauSac().subscribe(res => {
      this.rowData = res;
    });
  }
  openAdd(){
    this.matdialog.open(ThemMauSacComponent, {
      width: '65vh',
      height: '45vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaMauSacComponent, {
      width: '65vh',
      height: '45vh'
    });
  }
}
