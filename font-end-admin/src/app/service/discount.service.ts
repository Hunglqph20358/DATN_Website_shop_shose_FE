import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  private apiUrl = 'http://localhost:6868/api/admin/discount';
  private apiUrl2 = 'http://localhost:6868/api/admin/discount/kichHoat';


  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get<any[]>(this.apiUrl);
  }
  getProduct() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/discount/product');
  }
  getDiscountKH() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/discount/KH');
  }
  getDiscountKKH() {
    return this.http.get<any[]>('http://localhost:6868/api/admin/discount/KKH');
  }

  updateDiscount(id: number, discount: any) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, discount);
  }

  searchByDate(startDate: Date, endDate: Date): Observable<any> {
    // Kiểm tra nếu startDate hoặc endDate là undefined hoặc null, tránh lỗi
    if (!startDate || !endDate) {
      console.error('Ngày bắt đầu hoặc ngày kết thúc không được xác định.');
    }

    // Chuyển đổi string thành Date chỉ khi giá trị là hợp lệ
    const startDateTime = startDate instanceof Date ? startDate : null;
    const endDateTime = endDate instanceof Date ? endDate : null;

    // Kiểm tra nếu startDateTime hoặc endDateTime là null, không thực hiện tìm kiếm
    if (!startDateTime || !endDateTime) {
      console.error('Ngày bắt đầu hoặc ngày kết thúc không hợp lệ.');
      return;
    }

    const params = new HttpParams()
      .set('startDate', startDateTime.toISOString())
      .set('endDate', endDateTime.toISOString());

    return this.http.get<any>(`http://localhost:6868/api/admin/discount/searchByDate`, { params });
  }




  searchByDiscount(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`http://localhost:6868/api/admin/discount/searchByDiscount`, { params });
  }
  searchByProduct(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`http://localhost:6868/api/admin/discount/searchByProduct`, { params });
  }
  searchByBrand(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`http://localhost:6868/api/admin/discount/searchByBrand`, { params });
  }
  searchByCategory(search: string): Observable<any> {
    const params = new HttpParams()
      .set('search', search);
    return this.http.get<any>(`http://localhost:6868/api/admin/discount/searchByCategory`, { params });
  }
  KichHoat( id: number ) {
    const url = `${this.apiUrl2}/${id}`;
    return this.http.put(url, { /* provide data if needed */ }, { observe: 'response' });
  }


  getDetailDiscount(discountId: number) {
    const url = `${this.apiUrl}/${discountId}`;
    return this.http.get<any[]>(url);
  }
  deleteDiscount(discountId: number) {
    const url = `${this.apiUrl}/${discountId}`;
    return this.http.delete<any[]>(url);
  }

  createDiscount(discount: any): Observable<any> {
    return this.http.post(this.apiUrl, discount);
  }
}

