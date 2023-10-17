import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ThemChatLieuComponent} from "./them-chat-lieu/them-chat-lieu.component";

@Component({
  selector: 'app-chatlieu',
  templateUrl: './chatlieu.component.html',
  styleUrls: ['./chatlieu.component.css']
})
export class ChatlieuComponent implements OnInit {

  constructor(private matdialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAdd(){
    this.matdialog.open(ThemChatLieuComponent, {
      width: '90vh',
      height: '90vh'
    });
  }
}
