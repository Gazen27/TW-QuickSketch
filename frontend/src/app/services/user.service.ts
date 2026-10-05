import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserInfo {
  id: string;
  username: string;
  sketchCount: number;
  drawingScore: number;
  guessedScore: number;
}

interface UserResponse {
  status: string;
  message: string;
  data: UserInfo;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private APIurl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  getInfo(userId: string) {
    return this.http.get<UserResponse>(`${this.APIurl}/users/${userId}`);
  }
}