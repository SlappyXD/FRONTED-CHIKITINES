import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmpleado } from 'src/app/interfaces/generico.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-pop-empleado',
  templateUrl: './pop-empleado.component.html',
  styleUrls: ['./pop-empleado.component.css']
})
export class PopEmpleadoComponent implements OnInit{

  titulo: string  ="Agregar nuevo empleado"
  nameB: string  = "Crear";


  formGroup : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private matRef: MatDialogRef<PopEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public empleadoData: IEmpleado
   ){}

  ngOnInit(): void {
    console.log(this.empleadoData);
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(9), Validators.maxLength(9)]]
    });

    if(this.empleadoData){
      this.titulo = "Actualizar Empleado";
      this.nameB = "Actualizar";
      this.formGroup.get("nombre")?.setValue(this.empleadoData.nombre);
      this.formGroup.get("email")?.setValue(this.empleadoData.email);
      this.formGroup.get("direccion")?.setValue(this.empleadoData.direccion);
      this.formGroup.get("telefono")?.setValue(this.empleadoData.telefono);
    }else{
      this.empleadoData = {emplId:0,nombre:'',email:'',direccion:'',telefono:''};
    }
  }

  crearEmpleado() {
    if (this.formGroup.valid) {
      // Solo proceder si el formulario es válido
      this.empleadoData.nombre = this.formGroup.get("nombre")?.value;
      this.empleadoData.email = this.formGroup.get("email")?.value;
      this.empleadoData.direccion = this.formGroup.get("direccion")?.value;
      this.empleadoData.telefono = this.formGroup.get("telefono")?.value;

      this.empleadoService.crearEmpleado(this.empleadoData).subscribe(
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
