import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private http: HttpClient) { }
  getAllOrderDetailByOrder(idOrder: number): Observable<any>{
    return this.http.get(`${apiURL}get-order-detail/by-order/${idOrder}`);
  }
}
