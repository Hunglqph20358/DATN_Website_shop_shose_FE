import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private apiUrl = 'http://localhost:6868/api/admin/voucher';

  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get<any[]>(this.apiUrl);
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
}

