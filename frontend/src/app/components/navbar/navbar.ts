import { Component, HostListener  } from '@angular/core';
import { Output, EventEmitter     } from '@angular/core';
import { RouterLink               } from '@angular/router';
import { AsyncPipe                } from '@angular/common';
import { AuthService              } from '../../services/auth.service';
import { Observable               } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isScrolled = false;
  isMenuOpen = false;
  isLoggedIn$: Observable<boolean>;

  @Output() themeToggle = new EventEmitter<void>();
  toggleTheme(): void { this.themeToggle.emit(); }

  constructor(private authService: AuthService){
    this.isLoggedIn$ = this.authService.isLoggedIn$();
  }

  toggleMenu() : void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll() : void {
    this.isScrolled = window.scrollY > 20;
  }
}