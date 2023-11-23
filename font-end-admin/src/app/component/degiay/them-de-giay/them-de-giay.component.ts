import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SoleService} from '../../../service/sole.service';

@Component({
  selector: 'app-them-de-giay',
  templateUrl: './them-de-giay.component.html',
  styleUrls: ['./them-de-giay.component.css']
})
export class ThemDeGiayComponent implements OnInit {
  isSubmitted = false;
  SoleHeight: string;
  SoleMaterial: string;
  Description: string;
  Status: number;

  constructor(public dialogRef: MatDialogRef<ThemDeGiayComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private slsv: SoleService) { }

  ngOnInit(): void {
  }
  clickadd(){
    const sole = {
      soleHeight: this.SoleHeight,
      soleMaterial: this.SoleMaterial,
      description: this.Description,
      status: this.Status
    };
    this.slsv.AddSole(sole).subscribe(
      result => {
        console.log('Sole add success', result);
        this.dialogRef.close('addSole');
      },
      error => {
        console.error('Sole add error', error);
      }
    );
  }
  //

}
