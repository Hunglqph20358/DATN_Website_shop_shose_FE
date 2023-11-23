import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {apiURL, HTTP_OPTIONS} from '../config/apiUrl';
import {HttpClient} from '@angular/common/http';

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
  progressingOrder(obj): Observable<any> {
    return this.http.post(`${apiURL}progressing-order`, obj);
  }
  completeOrder(obj): Observable<any> {
    return this.http.post(`${apiURL}complete-order`, obj);
  }
  shipOrder(obj): Observable<any> {
    return this.http.post(`${apiURL}ship-order`, obj);
  }
}
