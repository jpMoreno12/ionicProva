import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private url = 'http://localhost/PHP_API_USERS/users/login.php';
  constructor() { }
  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, { email, senha });
  }

}
