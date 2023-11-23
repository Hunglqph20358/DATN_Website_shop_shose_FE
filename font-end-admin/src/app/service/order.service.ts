import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiURL, HTTP_OPTIONS} from '../config/apiUrl';
import {HttpClient} from '@angular/common/http';
import {Order} from '../component/model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  getAllOrderAdmin(status: number): Observable<any> {
    return this.http.get(`${apiURL}get-all-order?status=${status}`);
  }

  cancelOrder(obj): Observable<any> {
    return this.http.post(`${apiURL}cancel-order`, obj);
  }
  createOrderSales(order: Order): Observable<any>{
    return this.http.post<any>('http://localhost:6868/sales-counter/api/create-order', order);
  }
}
