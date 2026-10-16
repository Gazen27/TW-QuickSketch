import { Component   } from '@angular/core';
import { Router      } from '@angular/router';
import { RouterLink  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { signal      } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = signal('');
  showPassword = signal(false);

  constructor(private authService: AuthService, private router: Router){}

  togglePasswordVisibility(): void { this.showPassword.update(value => !value); }

  onSubmit(){
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.data.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set('');
        if(error.error?.message){ this.errorMessage.set(error.error.message)}
        else                    { this.errorMessage.set('Login failed. Please try again.')}
      }
    });
  }
}