import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MaterialpostService} from '../../../service/materialpost.service';
@Component({
  selector: 'app-sua-chat-lieu',
  templateUrl: './sua-chat-lieu.component.html',
  styleUrls: ['./sua-chat-lieu.component.css']
})
export class SuaChatLieuComponent implements OnInit{
  Name: string;
  Description: string;
  Status: number;
  rowData = [];
  constructor(
    public dialogRef: MatDialogRef<SuaChatLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mtsv: MaterialpostService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
  clickUpdate(id: number){
    const material = {
      name: this.data.name,
      description: this.data.description,
      status: this.data.status
    };
    this.mtsv.UpdateMaterial(id, material).subscribe(
      result => {
        console.log('Category add success', result);
        this.dialogRef.close('saveMaterial');
      },
      error => {
        console.error('Category add error', error);
      }
    );
  }
  getMaterial() {
    this.mtsv.getAllMaterial().subscribe(result => {
      this.rowData = [...result];
    });
  }
  ngOnInit(): void {
    this.getMaterial();
  }

}
