import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MausacService} from '../../../service/mausac.service';

@Component({
  selector: 'app-them-mau-sac',
  templateUrl: './them-mau-sac.component.html',
  styleUrls: ['./them-mau-sac.component.css']
})
export class ThemMauSacComponent implements OnInit {

  Name: string;
  constructor(public dialogRef: MatDialogRef<ThemMauSacComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mssv: MausacService) { }

  ngOnInit(): void {
  }
  clickadd(){
    const category = {
      name: this.Name,
    };
    this.mssv.AddMauSac(category).subscribe(
      result => {
        console.log('Color add success', result);
        this.dialogRef.close('addColor');
      },
      error => {
        console.error('Color add error', error);
      }
    );
  }

}
