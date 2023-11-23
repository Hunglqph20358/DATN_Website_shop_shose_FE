import {Component, Inject, OnInit} from '@angular/core';
import { CategoryService} from '../../../service/category.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';
@Component({
  selector: 'app-them-danh-muc',
  templateUrl: './them-danh-muc.component.html',
  styleUrls: ['./them-danh-muc.component.css']
})
export class ThemDanhMucComponent implements OnInit {
  CreateDate: Date;
  Name: string;
  UpdateDate: string;
  Status: number;
  blName: boolean;
  blStatus: boolean;
  maxLengthName: boolean;
  checkValidateDisableSave = false;
  constructor(public dialogRef: MatDialogRef<ThemDanhMucComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ctsv: CategoryService) {
  }

  ngOnInit(): void {
  }
  clickadd(){
    if (this.validate()){
      const category = {
        name: this.Name,
        status: this.Status
      };
      this.ctsv.AddCategory(category).subscribe(
        result => {
          console.log('Category add success', result);
          this.dialogRef.close('addCategory');
        },
        error => {
          console.error('Category add error', error);
        }
      );
    }
  }
  clearAllErrors() {
    this.blName = false;
    this.maxLengthName = false;
    this.blStatus = false;
  }

  validate(): boolean {
    const errors = [];
    if (_.isNil(this.Name.trim()) || _.isEmpty(this.Name.trim())) {
      errors.push('blName');
    }
    if (_.isNil(this.Name) || this.Name.trim().length > 250) {
      errors.push('maxLengthName');
    }
    if (_.isNil(this.Status)) {
      errors.push('blStatus');
    }
    this.clearAllErrors();
    this.setErrors(errors);
    this.checkValidateDisableSave = errors.length > 0;
    return errors.length === 0;
  }

  setErrors(errorArray) {
    for (const error of errorArray) {
      this[error] = true;
    }
  }

}
