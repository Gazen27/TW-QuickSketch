import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
  return this.http.post(`${this.APIurl}/users/login`, { username, password });
  }
}