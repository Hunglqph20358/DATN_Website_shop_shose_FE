import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInFrom} from '../../component/model/SignInFrom';
import {Observable} from 'rxjs';
import {JwtResponse} from '../../component/model/JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  private apiLogin = 'http://localhost:6868/api/sign-in';
  private apiFindByID: string;
  constructor(private httpClient: HttpClient){}
  signIn(signInForm: SignInFrom): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.apiLogin, signInForm);
  }
}
