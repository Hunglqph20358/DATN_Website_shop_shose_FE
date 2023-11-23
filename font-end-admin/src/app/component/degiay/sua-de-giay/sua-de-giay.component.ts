import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SoleService} from '../../../service/sole.service';

@Component({
  selector: 'app-sua-de-giay',
  templateUrl: './sua-de-giay.component.html',
  styleUrls: ['./sua-de-giay.component.css']
})
export class SuaDeGiayComponent implements OnInit {
  constructor( public dialogRef: MatDialogRef<SuaDeGiayComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private slsv: SoleService) { }

  ngOnInit(): void {
  }
  clickUpdate(id: number){
    const sole = {
      soleHeight: this.data.soleHeight,
      soleMaterial: this.data.soleMaterial,
      description: this.data.description,
      status: this.data.status
    };
    this.slsv.UpdateSole(id, sole).subscribe(
      result => {
        console.log('Sole add success', result);
        this.dialogRef.close('saveSole');
      },
      error => {
        console.error('Sole add error', error);
      }
    );
  }

}
