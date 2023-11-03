import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../service/category.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-sua-danh-muc',
  templateUrl: './sua-danh-muc.component.html',
  styleUrls: ['./sua-danh-muc.component.css']
})
export class SuaDanhMucComponent implements OnInit {
  CreateDate: Date;
  Name: string;
  UpdateDate: string;
  Status: number;
  constructor(private ctsv: CategoryService,
              private http: HttpClient) { }

  ngOnInit(): void {
  }
  Update(id: number){
    const category = {
      name: this.Name,
      updateDate: this.UpdateDate,
      status: this.Status
    };
    this.ctsv.UpdateCategory(id, category).subscribe(
      result => {
        console.log('Category add success', result);
      },
      error => {
        console.error('Category add error', error);
      }
    );
  }
}
