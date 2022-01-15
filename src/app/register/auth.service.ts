import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Register(data:any){
    return this.http.post(`${environment.baseUrl}/api/v1/auth/register`,data);
  }

  Login(data:any){
    return this.http.post(`${environment.baseUrl}/api/v1/auth/login`,data);
  }

  CheckValidToken(data:any){
    return this.http.put(`${environment.baseUrl}/api/v1/auth/check-token`,data)
  }
}
