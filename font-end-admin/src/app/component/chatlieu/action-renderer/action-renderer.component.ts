import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {SuaChatLieuComponent} from '../sua-chat-lieu/sua-chat-lieu.component';
import {MatDialog} from '@angular/material/dialog';
import {MaterialpostService} from '../../../service/materialpost.service';
import {ChatlieuComponent} from '../chatlieu.component';

@Component({
  selector: 'app-action-renderer',
  templateUrl: './action-renderer.component.html',
  styleUrls: ['./action-renderer.component.css']
})
export class ActionRendererComponent implements ICellRendererAngularComp, OnInit {

  params: any;
  rowData = [];

  constructor(private matdialog: MatDialog,
              private mtsv: MaterialpostService, private cdr: ChangeDetectorRef,
              private chatLieuComponent: ChatlieuComponent) {
  }

  agInit(params: any) {
    this.params = params.data;
  }

  refresh(): boolean {
    return false;
  }

  openUpdate(params?: any): void {
    const dialogref = this.matdialog.open(SuaChatLieuComponent, {
        width: '65vh',
        height: '45vh',
        data: this.params
      }
    );
    dialogref.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'saveMaterial') {
        this.chatLieuComponent.ngOnInit();
        this.cdr.detectChanges();
      }
    });
  }

  deleteMaterial(material?: any) {
    material = this.params.id;
    this.mtsv.DeleteMaterial(material).subscribe(() => {
      this.chatLieuComponent.ngOnInit();
      this.cdr.detectChanges();
    });
  }


  getMaterial() {
    this.mtsv.getAllMaterial().subscribe(result => {
      this.rowData = [...result];
      console.log(this.rowData);
    });
  }

  ngOnInit(): void {
    this.getMaterial();
  }

}
