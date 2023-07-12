import {Component, OnInit} from '@angular/core';
import {apiURL} from '../../config/apiURL';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  api = apiURL;

  ngOnInit(): void {
  }

}
