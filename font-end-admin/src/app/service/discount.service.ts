import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private apiUrl = 'http://localhost:6868/api/admin/discount';

  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getProduct() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/product');
  }

  updateDiscount(id: number, discount: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, discount);
  }

  deleteDiscount(discountId: number) {
    const url = `${this.apiUrl}/${discountId}`;
    return this.http.delete(url);
  }
  getDetailDiscount(discountId: number) {
    const url = `${this.apiUrl}/${discountId}`;
    return this.http.get<any[]>(url);
  }

  createDiscount(discount: any): Observable<any> {
    return this.http.post(this.apiUrl, discount);
  }
}

