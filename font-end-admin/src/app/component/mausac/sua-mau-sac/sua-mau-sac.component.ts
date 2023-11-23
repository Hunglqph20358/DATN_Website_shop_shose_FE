import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MausacService} from '../../../service/mausac.service';

@Component({
  selector: 'app-sua-mau-sac',
  templateUrl: './sua-mau-sac.component.html',
  styleUrls: ['./sua-mau-sac.component.css']
})
export class SuaMauSacComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuaMauSacComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private mssv: MausacService) { }

  ngOnInit(): void {
  }
  clickUpdate(id: number){
    const color = {
      name: this.data.name,
    };
    this.mssv.UpdateMauSac(id, color).subscribe(
      result => {
        console.log('Color add success', result);
        this.dialogRef.close('saveColor');
      },
      error => {
        console.error('Color add error', error);
      }
    );
  }

}
