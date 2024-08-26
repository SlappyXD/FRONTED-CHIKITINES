import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examen-front';
  showNav: boolean = true;

  constructor(private router: Router) {
    // Escuchar cambios en la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Condicionar rutas específicas donde no deseas mostrar el nav
        this.showNav = !['/', '/sign'].includes(event.urlAfterRedirects);
      }
    });
  }
}
