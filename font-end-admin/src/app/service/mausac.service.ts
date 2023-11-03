import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiUrl';
@Injectable({
  providedIn: 'root'
})
export class MausacService {

  constructor(private http: HttpClient) { }
  getAllMauSac(): Observable<any>{
    return this.http.get(`${apiURL}color/hien-thi`);
  }
}
