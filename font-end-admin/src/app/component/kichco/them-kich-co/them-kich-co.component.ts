import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SizeService} from '../../../service/size.service';
@Component({
  selector: 'app-them-kich-co',
  templateUrl: './them-kich-co.component.html',
  styleUrls: ['./them-kich-co.component.css']
})
export class ThemKichCoComponent implements OnInit {

  SizeNumber: string;
  Status: number;
  rowData = [];
  constructor( public dialogRef: MatDialogRef<ThemKichCoComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private szsv: SizeService) { }

  ngOnInit(): void {
  }
  clickadd(){
    const size = {
      sizeNumber: this.SizeNumber,
      status: this.Status
    };
    this.szsv.AddSize(size).subscribe(
      result => {
        console.log('Size add success', result);
        this.dialogRef.close('addSize');
      },
      error => {
        console.error('Size add error', error);
      }
    );
  }

}
