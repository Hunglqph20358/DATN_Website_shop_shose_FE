import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiUrl';
@Injectable({
  providedIn: 'root'
})
export class SoleService {

  constructor(private http: HttpClient) { }
  getAllSole(): Observable<any>{
    return this.http.get(`${apiURL}sole/hien-thi`);
  }
}
