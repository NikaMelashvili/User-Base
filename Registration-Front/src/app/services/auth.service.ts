import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignUp } from '../common/sign-up';
import { Observable } from 'rxjs';
import { Login } from '../common/login';
import { UserResponseDTO } from '../common/user-response-dto';
import { getTokenFromCookie } from '../utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrlAuth = 'http://127.0.0.1:8080/rest/authentication';
  private signUpUrl = this.baseUrlAuth + '/register';
  private loginUrl = this.baseUrlAuth + '/authenticate';

  private baseUrlProfile = 'http://127.0.0.1:8080/rest/profile';

  public currentUserEmail: string = '';

  userProfile: UserResponseDTO = new UserResponseDTO();

  constructor(private http: HttpClient) {}

  userRegister(user: SignUp): Observable<{ token: string }> {
    this.currentUserEmail = user.email;
    return this.http.post<{ token: string }>(this.signUpUrl, user, {
      withCredentials: true,
    });
  }

  userLogin(user: Login): Observable<{ token: string }> {
    this.currentUserEmail = user.email;
    return this.http.post<{ token: string }>(this.loginUrl, user, {
      withCredentials: true,
    });
  }

  loadUserProfile(email: string): Observable<UserResponseDTO> {
    const token: string = getTokenFromCookie() ?? '';
    const headers = this.attachTokenToHeaders(token);
    return this.http.get<UserResponseDTO>(
      `${this.baseUrlProfile}/byEmail?email=${this.currentUserEmail}`,
      {
        headers,
        withCredentials: true,
      }
    );
  }

  attachTokenToHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
