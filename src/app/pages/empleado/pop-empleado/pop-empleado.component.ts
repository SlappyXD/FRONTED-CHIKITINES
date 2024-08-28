import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';
import { VendedorService } from 'src/app/services/vendedor.service';

@Component({
  selector: 'app-pop-empleado',
  templateUrl: './pop-empleado.component.html',
  styleUrls: ['./pop-empleado.component.css']
})
export class PopEmpleadoComponent {
  titulo: string  ="Agregar nuevo empleado"
  nameB: string  = "Crear";

  formGroup : FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private vendedorService: VendedorService,
    private matRef: MatDialogRef<PopEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) public empleadoData: Vendedor
   ){}

  ngOnInit(): void {
    console.log(this.empleadoData);
    this.formGroup = this.formBuilder.group({
      id: [this.empleadoData?.idVendedor || null],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(9), Validators.maxLength(9)]]
    });

    if(this.empleadoData){
      this.titulo = "Actualizar Empleado";
      this.nameB = "Actualizar";
      this.formGroup.get("idVendedor")?.setValue(this.empleadoData.idVendedor);
      this.formGroup.get("nombre")?.setValue(this.empleadoData.nombre);
      this.formGroup.get("email")?.setValue(this.empleadoData.email);
      this.formGroup.get("direccion")?.setValue(this.empleadoData.direccion);
      this.formGroup.get("telefono")?.setValue(this.empleadoData.telefono);
    }else{
      this.empleadoData = {idVendedor:0,nombre:'',email:'',direccion:'',telefono:''};
    }
  }

  crearVendedor() {
    if (this.formGroup.valid) {
      // Recoge los valores del formulario
      const vendedor: Vendedor = this.formGroup.value as Vendedor;

      // Actualiza o crea dependiendo de si el producto tiene un ID
      if (this.empleadoData && this.empleadoData.idVendedor) {
        vendedor.idVendedor = this.empleadoData.idVendedor;
      } else {
        delete vendedor.idVendedor;
      }

      this.vendedorService.createVendedor(vendedor).subscribe(
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
