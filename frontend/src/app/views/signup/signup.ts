import { Component          } from '@angular/core';
import { FormsModule        } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService        } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    this.authService.signup(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.token);
        this.router.navigate(['/']);
      },
      error: (error) => { console.error(error); }
    });
  }
}