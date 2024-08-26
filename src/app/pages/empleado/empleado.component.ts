import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmpleado } from 'src/app/interfaces/generico.interface';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { PopEmpleadoComponent } from './pop-empleado/pop-empleado.component';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {

  listaEmpleado: Array<IEmpleado> = [];
  title = 'Empleado';

  constructor(
    private empleadoService: EmpleadoService,
    public dialog: MatDialog
  ) { }

  addEmpleado() {
    const dialogoEmpleado = this.dialog.open(PopEmpleadoComponent,{
      width: '50%',
      disableClose: true
    });

    dialogoEmpleado.beforeClosed().subscribe(result=>{
      if(result.success){
        alert("Se ha creado un empleado con id " + result.data.emplId);
        //this.listaEmpresas.push(result.data);
        this.listarAll();
      }
    })
    }

    updateEmpleado(empleado: IEmpleado) {
      const dialogoEmpleado = this.dialog.open(PopEmpleadoComponent,{
        width: '50%',
        disableClose: true,
        data: empleado
      });

      dialogoEmpleado.beforeClosed().subscribe(result => {
        if (result && result.success) {
          this.empleadoService.crearEmpleado(result.data).subscribe(
            (empleado) => {
              alert(`Se ha actualizado el empleado con id ${result.data.emplId}`);
              this.listarAll(); // Asumiendo que tienes un método para listar todos los usuarios
            },
            (error) => {
              alert('Error al guardar el empleado');
              console.error(error);
            }
          );
        }
      }) ;
      }

  ngOnInit(): void {
    this.listarAll();
  }

  listarAll() {
    this.empleadoService.listarAll().subscribe(response => {
      console.log(response);
      this.listaEmpleado = response;
    }, error => {
      console.error(error);

    });
  }

  eliminarEmpleado(empleado: IEmpleado) {
    if (confirm(`¿Estás seguro de que deseas eliminar el empleado con id ${empleado.emplId}?`)) {
      this.empleadoService.eliminarRol(empleado.emplId).subscribe(response => {
        if (response === 'Eliminacion Correcta') {
          alert(`El empleado con id ${empleado.emplId} ha sido eliminado.`);
          this.listaEmpleado = this.listaEmpleado.filter(e => e.emplId !== empleado.emplId);
        } else {
          alert("No se pudo eliminar el empleado.");
        }
      }, error => {
        console.error("Error al intentar eliminar el empleado:", error);
        alert("Hubo un error al intentar eliminar el empleado.");
      });
    }
  }

}
