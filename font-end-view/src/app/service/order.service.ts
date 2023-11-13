import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiURL';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(obj): Observable<any>{
    return this.http.post(`${apiURL}create-order`, obj);
  }
  createOrderBuyNow(obj): Observable<any>{
    return this.http.post(`${apiURL}create-order/buy-now`, obj);
  }

  getAllOrder(obj): Observable<any>{
    return this.http.post(`${apiURL}get-all-order`, obj);
  }
}
