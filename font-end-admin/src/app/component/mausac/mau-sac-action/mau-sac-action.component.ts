import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SuaMauSacComponent} from '../sua-mau-sac/sua-mau-sac.component';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {MatDialog} from '@angular/material/dialog';
import {MausacService} from '../../../service/mausac.service';
import {MausacComponent} from '../mausac.component';
@Component({
  selector: 'app-mau-sac-action',
  templateUrl: './mau-sac-action.component.html',
  styleUrls: ['./mau-sac-action.component.css']
})
export class MauSacActionComponent implements ICellRendererAngularComp, OnInit {

  rowData = [];
  params: any;
  agInit(params: any) {
    this.params = params.data;
  }

  refresh(): boolean {
    return false;
  }

  constructor(private matdialog: MatDialog,
              private mssv: MausacService,
              private cdr: ChangeDetectorRef,
              private mausacComponent: MausacComponent) { }

  ngOnInit(): void {
    this.getAllColor();
  }
  getAllColor(){
    this.mssv.getAllMauSac().subscribe(res => {
      this.rowData = res;
    });
  }
  openUpdate(){
    const dialogref = this.matdialog.open(SuaMauSacComponent, {
      width: '65vh',
      height: '45vh',
      data: this.params
    });
    dialogref.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'saveColor') {
        this.mausacComponent.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }
  deleteColor(color?: any) {
    color = this.params.id;
    this.mssv.DeleteMauSac(color).subscribe(() => {
      this.mausacComponent.ngOnInit();
      this.cdr.detectChanges();
    });
  }

}
