import { Component, HostListener  } from '@angular/core';
import { AuthService              } from '../../services/auth.service';
import { RouterLink               } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isScrolled = false;
  isMenuOpen = false;

  constructor(private authService: AuthService){}

  toggleMenu() : void {
    this.isMenuOpen = !this.isMenuOpen
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  @HostListener('window:scroll')
  onWindowScroll() : void {
    this.isScrolled = window.scrollY > 20;
  }
}