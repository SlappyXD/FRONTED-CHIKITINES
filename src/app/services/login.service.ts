import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ILoginDto } from '../interfaces/generico.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.urlBase + "/user/login";

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin' + ':' + '123456')
  });
  
  const body = {
    email: email,
    password: password
  };
  
  return this.http.post<any>(this.baseUrl,body, {headers: headers});

  }
}
