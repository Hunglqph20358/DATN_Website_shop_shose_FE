import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiUrl';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<any> {
    return this.http.get(`${apiURL}product/hien-thi`);
  }

  CreateProduct(product: any): Observable<any> {
    return this.http.post(`${apiURL}product/add`, product);
  }

  UpdateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${apiURL}product/update/${id}`, product);
  }

  DeleteProduct(id: number): Observable<any> {
    return this.http.delete(`${apiURL}product/delete/${id}`);
  }

  GetProduct(id: number): Observable<any> {
    return this.http.get(`${apiURL}product/detail/${id}`);
  }

  // AddProduct(): Observable<any>{
  //   return  this.http.post(`${apiURL}product/add`);
  // }
  searchProduct(param: string): Observable<any> {
    return this.http.get(`${apiURL}product/search/` + param);
  }


  exportExcelProduct(): Observable<Blob> {
    return this.http.get(apiURL + `product/export-data`, {responseType: 'blob'});
  }

  exportExcelProductTemplate(): Observable<Blob> {
    return this.http.get(apiURL + `product/export-data-template`, {responseType: 'blob'});
  }

  importExcelProduct(formData: FormData, typeImport) {
    return this.http.post(`${apiURL}product/import?typeImport=${typeImport}`, formData);
  }

  exportExcelProductErrors(listError: any): Observable<Blob> {
    return this.http.post(`${apiURL}product/exportDataErrors`, listError, {responseType: 'blob'});
  }

  uploadImgProduct(formData: FormData, idProduct) {
    return this.http.post(`${apiURL}upload-img-file?idProduct=${idProduct}`, formData);
  }
}
