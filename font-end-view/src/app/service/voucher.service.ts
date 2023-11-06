import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiURL';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }

  getAllVoucher(): Observable<any>{
    return this.http.get(`${apiURL}get-all-voucher`);
  }
  getVoucher(code: string): Observable<any>{
    return this.http.get(`${apiURL}get-voucher?code=${code}`);
  }
}
