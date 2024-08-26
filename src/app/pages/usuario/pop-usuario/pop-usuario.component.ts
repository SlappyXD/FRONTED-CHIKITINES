import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/generico.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pop-usuario',
  templateUrl: './pop-usuario.component.html',
  styleUrls: ['./pop-usuario.component.css']
})
export class PopUsuarioComponent implements OnInit {

  titulo: string  ="Agregar nuevo usuario"
  nameB: string  = "Crear";

  formGroup : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private matRef: MatDialogRef<PopUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuarioData: IUsuario
   ){}

  ngOnInit(): void {
    console.log(this.usuarioData);
    this.formGroup = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    });

    if(this.usuarioData){
      this.titulo = "Actualizar usuario";
      this.nameB = "Actualizar";
      this.formGroup.get("username")?.setValue(this.usuarioData.username);
      this.formGroup.get("password")?.setValue(this.usuarioData.password)
    }else{
      this.usuarioData = {usuId:0,username:'',password:''};
    }
  }

  /* crearUsuario(){
    this.usuarioData.username = this.formGroup.get("username")?.value;
    this.usuarioData.password = this.formGroup.get("password")?.value;
    this.usuarioService.crearUsuario(this.usuarioData).subscribe(response =>{

    this.matRef.close({success: true, data: response});
    }, error=>{
      this.matRef.close({success: false});
    });
  } */

  crearUsuario() {
    if (this.formGroup.valid) {
      // Solo proceder si el formulario es válido
      this.usuarioData.username = this.formGroup.get("username")?.value;
      this.usuarioData.password = this.formGroup.get("password")?.value;

      this.usuarioService.crearUsuario(this.usuarioData).subscribe(
        response => {
          // Cierra el modal con éxito y pasa los datos de la respuesta
          this.matRef.close({ success: true, data: response });
        },
        error => {
          // Cierra el modal con un indicador de fallo
          this.matRef.close({ success: false });
        }
      );
    } else {
      // Marca todos los campos como tocados para mostrar los mensajes de error
      this.formGroup.markAllAsTouched();
    }
  }

}
