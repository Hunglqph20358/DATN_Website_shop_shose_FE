import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiURL} from '../config/apiURL';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) {
  }

  getCart(productId: number, sizeId: number, colorId: number, quantity: number): Observable<any> {
    const cart = {
      'productId': productId,
      'productDetailDTO': {
        'colorDTO': {
          'id': colorId
        },
        'sizeDTO': {
          'id': sizeId
        }
      },
      'quantity': quantity
    };
    return this.http.post(`${apiURL}cart`, cart);
  }
}
