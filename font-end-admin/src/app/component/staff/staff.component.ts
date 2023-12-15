import { Component, OnInit } from '@angular/core';
import {ColDef, ColumnApi, ColumnResizedEvent, GridReadyEvent, GridApi} from 'ag-grid-community';
import {all} from 'codelyzer/util/function';
import {StaffService} from '../../service/staff.service';
import {UsersDTO} from '../model/UsersDTO';
import {CustomerComponent} from '../customer/customer.component';
import {UpdateStaffComponent} from './update-staff/update-staff.component';
import {MatDialog} from '@angular/material/dialog';
import {DetailStaffComponent} from './detail-staff/detail-staff.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  animal: string;
  listStaff: UsersDTO[] = [];
  constructor(private staffService: StaffService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllStaff();
  }
  getAllStaff(){
    this.staffService.getAllStaff().subscribe(
      data => {
        console.log(data);
        this.listStaff = data;
      }
    );
  }
  openDialog(staff): void {
    const dialogRef = this.dialog.open(DetailStaffComponent, {
      width: '1200px',
      height: '600px',
      data: {staffData: staff}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
