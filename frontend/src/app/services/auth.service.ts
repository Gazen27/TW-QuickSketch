import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  status: string;
  message: string;
  data: { token: string; };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIurl}/users/login`, { username, password });
  }

  signup(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIurl}/users`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}