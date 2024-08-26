import { Producto } from './../../interfaces/producto.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { PopProductoComponent } from './pop-producto/pop-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  listaProducto: Array<Producto> = [];
  title = 'Producto';


  constructor(
    private productoService: ProductoService,
    public dialog: MatDialog
  ) { }



  ngOnInit(): void {
    this.listarAll();
  }

  listarAll() {
    this.productoService.listAll().subscribe(response => {
      console.log(response);
      this.listaProducto = response;
    }, error => {
      console.error(error);

    });
  }

  eliminarProducto(producto: Producto) {
    if (producto.id == null) {
      alert('ID del producto no disponible.');
      return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar el producto con id ${producto.id}?`)) {
      this.productoService.deleteProduct(producto.id).subscribe(
        () => {
          // Elimina el producto de la lista local
          this.listaProducto = this.listaProducto.filter(p => p.id !== producto.id);
          alert('Producto eliminado con éxito.');
        },
        error => {
          console.error('Error al eliminar el producto:', error);
          alert('Error al eliminar el producto. Por favor, intente de nuevo.');
        }
      );
    }
  }


  addProducto() {
    const dialogoProducto = this.dialog.open(PopProductoComponent, {
      width: '50%',
      disableClose: true
    });

    dialogoProducto.beforeClosed().subscribe(result => {
      if (result.success) {
        alert("Se ha creado el producto con id " + result.data.id);
        this.listarAll();
      }
    });
  }


  updateProducto(producto: Producto) {
    const dialogoProducto = this.dialog.open(PopProductoComponent, {
      width: '50%',
      disableClose: true,
      data: producto
    });

    dialogoProducto.beforeClosed().subscribe(result => {
      if (result.success) {
        alert("Se ha actualizado el producto con id " + result.data.id);
        this.listarAll();
      }
    });
  }

}
