import { Component, signal  } from '@angular/core';
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
  errorMessage = signal('');
  showPassword = signal(false);

  constructor(private authService: AuthService, private router: Router){}

  togglePasswordVisibility(): void { this.showPassword.update(value => !value); }

  onSubmit(){
    this.errorMessage.set('');

    this.authService.signup(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.token);
        this.router.navigate(['/']);
      },
      error: (error) => { 
        if(error.error?.message){ this.errorMessage.set(error.error.message); }
        else                    { this.errorMessage.set('Signup failed. Please try again.')}
      }
    });
  }
}