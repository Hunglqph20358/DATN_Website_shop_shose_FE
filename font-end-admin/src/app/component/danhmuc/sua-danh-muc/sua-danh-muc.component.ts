import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as _ from 'lodash';

@Component({
  selector: 'app-sua-danh-muc',
  templateUrl: './sua-danh-muc.component.html',
  styleUrls: ['./sua-danh-muc.component.css']
})
export class SuaDanhMucComponent implements OnInit {
  blName: boolean;
  blStatus: boolean;
  maxLengthName: boolean;
  checkValidateDisableSave = false;
  constructor(public dialogRef: MatDialogRef<SuaDanhMucComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private ctsv: CategoryService
  ) { }

  ngOnInit(): void {
  }
  clickUpdate(id: number){
    if (this.validate()) {
      const category = {
        name: this.data.name,
        status: this.data.status
      };
      this.ctsv.UpdateCategory(id, category).subscribe(
        result => {
          console.log('Category add success', result);
          this.dialogRef.close('saveCategory');
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
    if (_.isNil(this.data.name.trim()) || _.isEmpty(this.data.name.trim())) {
      errors.push('blName');
    }
    if (_.isNil(this.data.name) || this.data.name.trim().length > 250) {
      errors.push('maxLengthName');
    }
    if (_.isNil(this.data.status)) {
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
