import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiUrl';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getAllProduct(): Observable<any>{
   return  this.http.get(`${apiURL}product/hien-thi`);
  }
  // AddProduct(): Observable<any>{
  //   return  this.http.post(`${apiURL}product/add`);
  // }
}
