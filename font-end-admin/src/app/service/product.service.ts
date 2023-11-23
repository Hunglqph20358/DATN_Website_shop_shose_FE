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
  CreateProduct(product: any): Observable<any>{
    return this.http.post(`${apiURL}product/add`, product);
  }
  UpdateProduct(id: number, product: any): Observable<any>{
    return this.http.put(`${apiURL}product/update/${id}`, product);
  }
  DeleteProduct(id: number): Observable<any>{
    return this.http.delete(`${apiURL}product/delete/${id}`);
  }
}
