import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BrandService} from "../../../service/brand.service";

@Component({
  selector: 'app-sua-thuong-hieu',
  templateUrl: './sua-thuong-hieu.component.html',
  styleUrls: ['./sua-thuong-hieu.component.css']
})
export class SuaThuongHieuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuaThuongHieuComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private brsv: BrandService) { }

  ngOnInit(): void {
  }
  clickUpdate(id: number){
    const brand = {
      name: this.data.name,
    };
    this.brsv.UpdateBrand(id, brand).subscribe(
      result => {
        console.log('Brand add success', result);
        this.dialogRef.close('saveBrand');
      },
      error => {
        console.error('Brand add error', error);
      }
    );
  }

}
