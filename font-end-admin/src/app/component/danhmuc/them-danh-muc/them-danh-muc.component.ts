import { Component, OnInit } from '@angular/core';
import { CategoryService} from '../../../service/category.service';
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-them-danh-muc',
  templateUrl: './them-danh-muc.component.html',
  styleUrls: ['./them-danh-muc.component.css']
})
export class ThemDanhMucComponent implements OnInit {
  CreateDate: Date;
  Name: string;
  UpdateDate: string;
  Status: number;
  constructor(private ctsv: CategoryService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }
  clickadd(){
    const category = {
      name: this.Name,
      createDate: this.CreateDate,
      updateDate: this.UpdateDate,
      status: this.Status
    };
    this.ctsv.AddCategory(category).subscribe(
      result => {
        console.log('Category add success', result);
      },
      error => {
        console.error('Category add error', error);
      }
    );
  }

}
