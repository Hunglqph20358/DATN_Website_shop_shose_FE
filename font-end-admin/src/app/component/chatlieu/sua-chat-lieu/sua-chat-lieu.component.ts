import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MaterialpostService} from '../../../service/materialpost.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-sua-chat-lieu',
  templateUrl: './sua-chat-lieu.component.html',
  styleUrls: ['./sua-chat-lieu.component.css']
})
export class SuaChatLieuComponent implements OnInit{
  rowData = [];
  blName: boolean;
  blDescription: boolean;
  blStatus: boolean;
  maxLengthName: boolean;
  checkValidateDisableSave = false;
  constructor(
    public dialogRef: MatDialogRef<SuaChatLieuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mtsv: MaterialpostService) { }
  clickUpdate(id: number){
    const material = {
      name: this.data.name,
      description: this.data.description,
      status: this.data.status
    };
    this.mtsv.UpdateMaterial(id, material).subscribe(
      result => {
        console.log('Material add success', result);
        this.dialogRef.close('saveMaterial');
      },
      error => {
        console.error('Material add error', error);
      }
    );
  }
  ngOnInit(): void {
  }
  setErrors(errorArray) {
    for (const error of errorArray) {
      this[error] = true;
    }
  }
  validate(): boolean {
    debugger
    const errors = [];
    if (_.isNil(this.data.name.trim()) || _.isEmpty(this.data.name.trim())) {
      errors.push('blName');
    }
    if (_.isNil(this.data.name) || this.data.name.trim().length > 250) {
      errors.push('maxLengthName');
    }
    if (_.isNil(this.data.description.trim()) || _.isEmpty(this.data.description.trim())) {
      errors.push('blDescription');
    }
    if (_.isNil(this.data.status)) {
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
    if (errors.length <= 0) {
      this.checkValidateDisableSave = false;
      return true;
    } else {
      this.checkValidateDisableSave = true;
      return false;
    }
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

}
