import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-pop-producto',
  templateUrl: './pop-producto.component.html',
  styleUrls: ['./pop-producto.component.css']
})
export class PopProductoComponent {
  titulo: string  ="Agregar nueva Producto"
  nameB: string  = "Crear";


  formGroup : FormGroup = new FormGroup({});

  constructor(
   private formBuilder: FormBuilder,
   private productoService: ProductoService,
   private matRef: MatDialogRef<PopProductoComponent>,
   @Inject(MAT_DIALOG_DATA) public productoData: Producto
  ){}


  ngOnInit(): void {
    console.log(this.productoData);
    this.formGroup = this.formBuilder.group({
      id: [this.productoData?.id || null], //
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)]],
      descripcion: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      precio: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });

    if(this.productoData){
      this.titulo = "Actualizar Producto";
      this.nameB = "Actualizar";
      this.formGroup.get("id")?.setValue(this.productoData.id);
      this.formGroup.get("nombre")?.setValue(this.productoData.nombre);
      this.formGroup.get("descripcion")?.setValue(this.productoData.descripcion);
      this.formGroup.get("stock")?.setValue(this.productoData.stock);
      this.formGroup.get("precio")?.setValue(this.productoData.precio);
    }else{
      this.productoData = {id:0,nombre:'',descripcion:'', stock:0,precio:0};
    }
  }


  /* crearProducto() {
    if (this.formGroup.valid) {
      // Solo proceder si el formulario es válido
      this.productoData.id = this.formGroup.get("id")?.value;
      this.productoData.nombre = this.formGroup.get("nombre")?.value;
      this.productoData.descripcion = this.formGroup.get("descripcion")?.value;
      this.productoData.stock = this.formGroup.get("stock")?.value;
      this.productoData.precio = this.formGroup.get("precio")?.value; // Asumiendo que estado tiene un valor por defecto

      this.productoService.createProduct(this.productoData).subscribe(
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
  } */

    crearProducto() {
      if (this.formGroup.valid) {
        // Recoge los valores del formulario
        const producto: Producto = this.formGroup.value as Producto;

        // Actualiza o crea dependiendo de si el producto tiene un ID
        if (this.productoData && this.productoData.id) {
          // Si hay un ID, es una actualización
          producto.id = this.productoData.id;
        } else {
          // Si no hay un ID, asegúrate de que no se envíe un ID (o que sea 0)
          delete producto.id;
        }

        this.productoService.createProduct(producto).subscribe(
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
