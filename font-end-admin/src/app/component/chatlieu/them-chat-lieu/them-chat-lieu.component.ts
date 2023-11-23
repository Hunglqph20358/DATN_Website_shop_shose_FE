import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MaterialpostService} from '../../../service/materialpost.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-them-chat-lieu',
  templateUrl: './them-chat-lieu.component.html',
  styleUrls: ['./them-chat-lieu.component.css']
})
export class ThemChatLieuComponent implements OnInit {
  Name: string;
  Description: string;
  Status: number;
  blName: boolean;
  blDescription: boolean;
  blStatus: boolean;
  maxLengthName: boolean;
  checkValidateDisableSave = false;

  rowData = [];

  constructor(
    public dialogRef: MatDialogRef<ThemChatLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mtsv: MaterialpostService) {
  }

  getMaterial() {
    this.mtsv.getAllMaterial().subscribe(result => {
      this.rowData = result;
    });
  }

  clickadd() {
    if (this.validate()) {
      const category = {
        name: this.Name,
        description: this.Description,
        status: this.Status
      };
      this.mtsv.CreateMaterial(category).subscribe(
        result => {
          console.log('Material add success', result);
          this.dialogRef.close('addMaterial');
        },
        error => {
          console.error('Material add error', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getMaterial();
  }

  clearAllErrors() {
    this.blName = false;
    // this.codePatten = false;
    // this.maxlengthCode = false;
    // this.blName = false;
    this.maxLengthName = false;
    this.blStatus = false;
    this.blDescription = false;
    // this.blGradeLevel = false;
    // this.blDept = false;
    // this.maxlengthDescription = false;
  }

  validate(): boolean {
    const errors = [];
    if (_.isNil(this.Name.trim()) || _.isEmpty(this.Name.trim())) {
      errors.push('blName');
    }
    if (_.isNil(this.Name) || this.Name.trim().length > 250) {
      errors.push('maxLengthName');
    }
    if (_.isNil(this.Description.trim()) || _.isEmpty(this.Description.trim())) {
      errors.push('blDescription');
    }
    if (_.isNil(this.Status)) {
      errors.push('blStatus');
    }
    // if (this.subjectSchool.code.trim().match(/[^\x00-\x7F]+/)) {
    //   errors.push('codePatten');
    // }
    // if (_.isNil(this.subjectSchool.name.trim()) || _.isEmpty(this.subjectSchool.name.trim())) {
    //   errors.push('blName');
    // }
    // if (this.subjectSchool.name.trim().length > 250) {
    //   errors.push('maxlengthName');
    // }
    // if (_.isNil(this.subjectSchool.gradeLevel)) {
    //   errors.push('blGradeLevel');
    // }
    // if (this.subjectSchool.department.length === 0) {
    //   errors.push('blDept');
    // }
    // if (this.subjectSchool.description.trim().length > 500) {
    //   this.maxlengthDescription = true;
    //   errors.push('maxlengthDescription');
    // }
    this.clearAllErrors();
    this.setErrors(errors);
    // if (errors.length <= 0) {
    //   this.checkValidateDisableSave = false;
    //   return true;
    // } else {
    //   this.checkValidateDisableSave = true;
    //   return false;
    // }
    this.checkValidateDisableSave = errors.length > 0;
    return errors.length === 0;
  }

  setErrors(errorArray) {
    for (const error of errorArray) {
      this[error] = true;
    }
  }
}
