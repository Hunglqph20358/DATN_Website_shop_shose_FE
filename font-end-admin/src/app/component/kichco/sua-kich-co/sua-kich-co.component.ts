import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SizeService} from '../../../service/size.service';
@Component({
  selector: 'app-sua-kich-co',
  templateUrl: './sua-kich-co.component.html',
  styleUrls: ['./sua-kich-co.component.css']
})
export class SuaKichCoComponent implements OnInit {

  rowData: [];
  constructor(public dialogRef: MatDialogRef<SuaKichCoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private szsv: SizeService) { }

  ngOnInit(): void {
  }
  clickUpdate(id: number){
    const size = {
      sizeNumber: this.data.sizeNumber,
      status: this.data.status
    };
    this.szsv.UpdateSize(id, size).subscribe(
      result => {
        console.log('Size add success', result);
        this.dialogRef.close('saveSize');
      },
      error => {
        console.error('Size add error', error);
      }
    );
  }

}
