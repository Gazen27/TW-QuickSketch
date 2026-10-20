import { Component, signal  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute     } from '@angular/router';
import { FormsModule        } from '@angular/forms';
import { AuthService        } from '../../services/auth.service';

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
  authRequired = signal(false);

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
    this.authRequired.set(this.route.snapshot.queryParamMap.get('authRequired') === 'true');
  }

  togglePasswordVisibility(): void { this.showPassword.update(value => !value); }

  clearAuthRequiredMessage(): void { this.authRequired.set(false); }

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