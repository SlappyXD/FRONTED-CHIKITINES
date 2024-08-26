import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmpresa } from 'src/app/interfaces/generico.interface';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-pop-empresa',
  templateUrl: './pop-empresa.component.html',
  styleUrls: ['./pop-empresa.component.css']
})
export class PopEmpresaComponent implements OnInit {

  titulo: string  ="Agregar nueva empresa"
  nameB: string  = "Crear";


  formGroup : FormGroup = new FormGroup({});

  constructor(
   private formBuilder: FormBuilder,
   private empresaService: EmpresaService,
   private matRef: MatDialogRef<PopEmpresaComponent>,
   @Inject(MAT_DIALOG_DATA) public empresaData: IEmpresa
  ){}


  ngOnInit(): void {
    console.log(this.empresaData);
    this.formGroup = this.formBuilder.group({
      ruc:['',[Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(11), Validators.maxLength(11)]],
      razonSocial:['',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      representante:['',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      estado:[1]
    });

    if(this.empresaData){
      this.titulo = "Actualizar empresa";
      this.nameB = "Actualizar";
      this.formGroup.get("representante")?.setValue(this.empresaData.representante);
      this.formGroup.get("razonSocial")?.setValue(this.empresaData.razonSocial);
      this.formGroup.get("ruc")?.setValue(this.empresaData.ruc);
      this.formGroup.get("estado")?.setValue(this.empresaData.estado);
    }else{
      this.empresaData = {emprId:0, estado:1,razonSocial:'',ruc:'',representante:''};
    }
  }


  crearEmpresa() {
    if (this.formGroup.valid) {
      // Solo proceder si el formulario es válido
      this.empresaData.representante = this.formGroup.get("representante")?.value;
      this.empresaData.razonSocial = this.formGroup.get("razonSocial")?.value;
      this.empresaData.ruc = this.formGroup.get("ruc")?.value;
      this.empresaData.estado = this.formGroup.get("estado")?.value; // Asumiendo que estado tiene un valor por defecto

      this.empresaService.crearEmpresa(this.empresaData).subscribe(
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
