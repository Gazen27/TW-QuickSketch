import { Injectable      } from '@angular/core';
import { HttpClient      } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

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
  private loggedIn = new BehaviorSubject<boolean>(localStorage.getItem('token') !== null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIurl}/users/login`, { username, password });
  }

  signup(username: string, password: string) {
    return this.http.post<LoginResponse>(`${this.APIurl}/users`, { username, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if(!token){ return null; }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  isLoggedIn$() {
    return this.loggedIn.asObservable();
  }
}