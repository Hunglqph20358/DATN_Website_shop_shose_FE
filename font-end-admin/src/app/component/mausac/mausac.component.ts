import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemKichCoComponent} from "../kichco/them-kich-co/them-kich-co.component";
import {SuaKichCoComponent} from "../kichco/sua-kich-co/sua-kich-co.component";
import {ThemMauSacComponent} from "./them-mau-sac/them-mau-sac.component";
import {SuaMauSacComponent} from "./sua-mau-sac/sua-mau-sac.component";

@Component({
  selector: 'app-mausac',
  templateUrl: './mausac.component.html',
  styleUrls: ['./mausac.component.css']
})
export class MausacComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAdd(){
    this.matdialog.open(ThemMauSacComponent, {
      width: '65vh',
      height: '45vh'
    });
  }
  openUpdate(){
    this.matdialog.open(SuaMauSacComponent, {
      width: '65vh',
      height: '45vh'
    });
  }
}
