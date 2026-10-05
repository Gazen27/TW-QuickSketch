import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  username = '';
  sketchCount = 0;
  drawingScore = 0;
  guessedScore = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) { return; }

    this.userService.getInfo(userId).subscribe({
      next: (response) => {
        this.username = response.data.username;
        this.sketchCount = response.data.sketchCount;
        this.drawingScore = response.data.drawingScore;
        this.guessedScore = response.data.guessedScore;
      },
      error: (error) => { console.error(error); }
    });
  }
}