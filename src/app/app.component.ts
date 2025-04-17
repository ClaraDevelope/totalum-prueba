import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  isLightMode = true;
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleModoOscuro() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.classList.toggle('light-mode', !this.isDarkMode);
    localStorage.setItem('modo-oscuro', String(this.isDarkMode));
  }

  ngOnInit(): void {
    const guardado = localStorage.getItem('modo-oscuro') === 'true';
    this.isDarkMode = guardado;
    document.body.classList.add(this.isDarkMode ? 'dark-mode' : 'light-mode');
  }
}
