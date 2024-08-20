import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../common/sign-up';
import { Observable } from 'rxjs';
import { Login } from '../common/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = 'http://127.0.0.1:8080/rest/authentication/register';
  private loginUrl = 'http://127.0.0.1:8080/rest/authentication/authenticate';

  constructor(private http: HttpClient) {}

  userRegister(user: SignUp): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.signUpUrl, user);
  }

  userLogin(user: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, user);
  }
}
