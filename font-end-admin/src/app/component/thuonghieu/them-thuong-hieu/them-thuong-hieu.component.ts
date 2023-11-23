import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandService} from "../../../service/brand.service";

@Component({
  selector: 'app-them-thuong-hieu',
  templateUrl: './them-thuong-hieu.component.html',
  styleUrls: ['./them-thuong-hieu.component.css']
})
export class ThemThuongHieuComponent implements OnInit {

  Name: string;
  status: number;
  constructor(public dialogRef: MatDialogRef<ThemThuongHieuComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private brsv: BrandService) { }

  ngOnInit(): void {
  }
  clickadd(){
    const brand = {
      name: this.Name,
      status: this.status
    };
    this.brsv.AddBrand(brand).subscribe(
      result => {
        console.log('Brand add success', result);
        this.dialogRef.close('addBrand');
      },
      error => {
        console.error('Brand add error', error);
      }
    );
  }

}
