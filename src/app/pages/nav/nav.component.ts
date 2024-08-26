import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {



  home: string = "/home"
  tables: string = "/tables";
  billing: string = "/billing";
  rtl: string = "/rtl";
  virtual: string = "/virtual";
  notifications: string = "/notifications";
  profile: string = "/profile";
  sign: string = "/sign"
  signup: string = "/signup"

  empresa: string = "/empresa"
  rol: string = "/rol"
  empleado: string = "/empleado"
  usuario: string = "/usuario"

  constructor(
    private router: Router
  ) {  }

  logout(): void {
    localStorage.removeItem('login');
    this.router.navigate(['sign']); // Redirige a la página de inicio de sesión o cualquier otra página deseada
  }
}
