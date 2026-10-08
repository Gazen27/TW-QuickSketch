import { Component    } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar       } from './components/navbar/navbar';
import { Footer       } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLightTheme = false;

  toggleTheme(): void {
    this.isLightTheme = !this.isLightTheme;
    document.body.classList.toggle('light-theme', this.isLightTheme);
  }
}