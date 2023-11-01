import { Component, OnInit } from '@angular/core';
import {ColDef, ColumnApi, ColumnResizedEvent, GridReadyEvent, GridApi} from 'ag-grid-community';
import {all} from 'codelyzer/util/function';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  getAllStaff(code: string, fullname: String, birthday: string){

  }
  constructor() { }

  ngOnInit(): void {

  }

}
