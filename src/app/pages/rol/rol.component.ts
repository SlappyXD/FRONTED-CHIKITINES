import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRol } from 'src/app/interfaces/generico.interface';
import { RolService } from 'src/app/services/rol.service';
import { PopRolComponent } from './pop-rol/pop-rol.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit{

  listaRoles: Array<IRol> = [];
  title = 'Rol';

  constructor(
    private rolService: RolService,
    public dialog: MatDialog
  ) { }

  addRol() {
    const dialogoRol = this.dialog.open(PopRolComponent,{
      width: '50%',
      disableClose: true
    });

    dialogoRol.beforeClosed().subscribe(result=>{
      if(result.success){
        alert("Se ha creado un rol con id " + result.data.id);
        //this.listaEmpresas.push(result.data);
        this.listarAll();
      }
    })
    }

    updateRol(rol: IRol) {
      const dialogoRol = this.dialog.open(PopRolComponent,{
        width: '50%',
        disableClose: true,
        data: rol
      });

      dialogoRol.beforeClosed().subscribe(result => {
        if (result && result.success) {
          this.rolService.crearRol(result.data).subscribe(
            (empleado) => {
              alert(`Se ha actualizado el rol con id ${result.data.id}`);
              this.listarAll(); // Asumiendo que tienes un método para listar todos los usuarios
            },
            (error) => {
              alert('Error al guardar el rol');
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
    this.rolService.listarAll().subscribe(response => {
      console.log(response);
      this.listaRoles = response;
    }, error => {
      console.error(error);

    });
  }

  eliminarRol(rol: IRol) {
    if (confirm(`¿Estás seguro de que deseas eliminar el rol con id ${rol.id}?`)) {
      this.rolService.eliminarRol(rol.id).subscribe(response => {
        if (response === 'Eliminacion Correcta') {
          alert(`El rol con id ${rol.id} ha sido eliminado.`);
          this.listaRoles = this.listaRoles.filter(r => r.id !== rol.id);
        } else {
          alert("No se pudo eliminar el rol.");
        }
      }, error => {
        console.error("Error al intentar eliminar el rol:", error);
        alert("Hubo un error al intentar eliminar el rol.");
      });
    }
  }

}
