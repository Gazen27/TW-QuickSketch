import { Component, HostListener  } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isScrolled = false;

  @HostListener('window:scroll')
  onWindowScroll() : void {
    this.isScrolled = window.scrollY > 20;
  }
}