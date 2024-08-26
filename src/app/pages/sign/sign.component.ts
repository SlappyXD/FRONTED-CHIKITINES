import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginDto } from 'src/app/interfaces/generico.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent{
  email: string = '';
  password: string = '';
  
  constructor(private apiService: LoginService, private router: Router) {}

  doLogin() {
    console.log('Credentials:', { email: this.email, password: this.password });
    this.apiService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          // Aquí podrías redirigir al usuario a una página protegida o a la página principal
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error:', error);
          // Puedes mostrar un mensaje de error en la UI si es necesario
        }
      );
  }
}


