import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MaterialpostService} from '../../../service/materialpost.service';


@Component({
  selector: 'app-them-chat-lieu',
  templateUrl: './them-chat-lieu.component.html',
  styleUrls: ['./them-chat-lieu.component.css']
})
export class ThemChatLieuComponent implements OnInit {
  Name: string;
  Description: string;
  Status: number;
  rowData = [];
  constructor(
    public dialogRef: MatDialogRef<ThemChatLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mtsv: MaterialpostService) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
  getMaterial() {
    this.mtsv.getAllMaterial().subscribe(result => {
      this.rowData = result;
    });
  }
  clickadd(){
    const category = {
      name: this.Name,
      description: this.Description,
      status: this.Status
    };
    this.mtsv.CreateMaterial(category).subscribe(
      result => {
        console.log('Category add success', result);
        this.dialogRef.close('addMaterial');
      },
      error => {
        console.error('Category add error', error);
      }
    );
  }

  ngOnInit(): void {
    this.getMaterial();
  }

}
