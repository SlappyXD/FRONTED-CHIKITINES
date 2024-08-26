import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRol } from 'src/app/interfaces/generico.interface';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-pop-rol',
  templateUrl: './pop-rol.component.html',
  styleUrls: ['./pop-rol.component.css']
})
export class PopRolComponent implements OnInit{

  titulo: string  ="Agregar nuevo rol"
  nameB: string  = "Crear";

  formGroup : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private matRef: MatDialogRef<PopRolComponent>,
    @Inject(MAT_DIALOG_DATA) public rolData: IRol
   ){}

  ngOnInit(): void {
    console.log(this.rolData);
    this.formGroup = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
    });

    if(this.rolData){
      this.titulo = "Actualizar Rol";
      this.nameB = "Actualizar";
      this.formGroup.get("nombre")?.setValue(this.rolData.nombre);
    }else{
      this.rolData = {id:0, nombre:''};
    }

  }

  crearRol() {
    if (this.formGroup.valid) {
      // Solo proceder si el formulario es válido
      this.rolData.nombre = this.formGroup.get("nombre")?.value;

      this.rolService.crearRol(this.rolData).subscribe(
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
