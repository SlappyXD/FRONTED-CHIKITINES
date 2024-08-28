import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';
import { VendedorService } from 'src/app/services/vendedor.service';
import { PopEmpleadoComponent } from './pop-empleado/pop-empleado.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit{

  listaEmpleado: Array<Vendedor> = [];
  title = 'Empleado';

  constructor(
    private vendedorService: VendedorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarAll();
  }

  listarAll() {
    this.vendedorService.listAll().subscribe(response => {
      console.log(response);
      this.listaEmpleado = response;
    }, error => {
      console.error(error);

    });
  }

  eliminarEmpleado(vendedor: Vendedor) {
    if (vendedor.idVendedor == null) {
      alert('ID del vendedor no disponible.');
      return;
    }

    if (confirm(`¿Estás seguro de que deseas eliminar el vendedor con id ${vendedor.idVendedor}?`)) {
      this.vendedorService.deleteProduct(vendedor.idVendedor).subscribe(
        () => {
          // Elimina el producto de la lista local
          this.listaEmpleado = this.listaEmpleado.filter(p => p.idVendedor !== vendedor.idVendedor);
          alert('Vendedor eliminado con éxito.');
        },
        error => {
          console.error('Error al eliminar el vendedor:', error);
          alert('Error al eliminar el vendedor. Por favor, intente de nuevo.');
        }
      );
    }
  }

  addEmpleado() {
    const dialogoVendedor = this.dialog.open(PopEmpleadoComponent, {
      width: '50%',
      disableClose: true
    });

    dialogoVendedor.beforeClosed().subscribe(result => {
      if (result.success) {
        alert("Se ha creado el vendedor con id " + result.data.idVendedor);
        this.listarAll();
      }
    });
  } 

  updateEmpleado(vendedor: Vendedor) {
    const dialogoVendedor = this.dialog.open(PopEmpleadoComponent, {
      width: '50%',
      disableClose: true,
      data: vendedor
    });
    dialogoVendedor.beforeClosed().subscribe(result => {
      if (result.success) {
        alert("Se ha actualizado el vendedor con id " + result.data.idVendedor);
        this.listarAll();
      }
    });
  }
}