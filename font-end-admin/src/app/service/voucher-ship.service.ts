import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoucherShipService {
  private apiUrl = 'http://localhost:6868/api/admin/voucherFS';
  private apiUrl2 = 'http://localhost:6868/api/admin/voucherFS/kichHoat';

  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getCustomer() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/voucherFS/customer');
  }
  updateVoucher(id, voucher: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, voucher);
  }
  getDetailVoucher(voucherId: number) {
    const url = `${this.apiUrl}/${voucherId}`;
    return this.http.get<any[]>(url);
  }
  deleteVoucher(voucherId: number) {
    const url = `${this.apiUrl}/${voucherId}`;
    return this.http.delete(url);
  }

  createVoucher(voucher: any): Observable<any> {
    return this.http.post(this.apiUrl, voucher);
  }
  KichHoat( id: number ) {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.put(url, { /* provide data if needed */ }, { observe: 'response' });
  }
  getVoucherKH() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/voucherFS/KH');
  }
  getVoucherKKH() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/voucherFS/KKH');
  }
  searchByDate(obj): Observable<any> {
    return this.http.get<any>(`http://localhost:6868/api/admin/voucherFS/searchByDate`, obj );
  }
  searchByCustomer(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`${this.apiUrl}/searchByCustomer`, { params });
  }
  searchByVoucher(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`http://localhost:6868/api/admin/voucherFS/searchByVoucherFS`, { params });
  }
}

