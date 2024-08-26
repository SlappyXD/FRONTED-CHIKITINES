import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/generico.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopUsuarioComponent } from './pop-usuario/pop-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  listaUsuarios: Array<IUsuario> = [];
  title = 'Usuario';

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  addUsuario() {
    const dialogoEmpleado = this.dialog.open(PopUsuarioComponent,{
      width: '50%',
      disableClose: true
    });

    dialogoEmpleado.beforeClosed().subscribe(result=>{
      console.log(result.data);
      if(result.success){
        alert("Se ha creado un empleado con id " + result.data.usuId);
        //this.listaEmpresas.push(result.data);
        this.listarAll();
      }
    })
    }

    updateUsuario(usuario: IUsuario) {
      console.log(usuario);
      const dialogoUsuario = this.dialog.open(PopUsuarioComponent,{
        width: '50%',
        disableClose: true,
        data: usuario
      });

      dialogoUsuario.beforeClosed().subscribe(result => {
        if (result && result.success) {
          this.usuarioService.crearUsuario(result.data).subscribe(
            (usuario) => {
              alert(`Se ha actualizado el usuario con id ${result.data.usuId}`);
              this.listarAll(); // Asumiendo que tienes un método para listar todos los usuarios
            },
            (error) => {
              alert('Error al guardar el usuario');
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
        this.usuarioService.listarAll().subscribe(response => {
          console.log(response);
          this.listaUsuarios = response;
        }, error => {
          console.error(error);

        });
      }

      eliminarUsuario(usuario: IUsuario) {
        if (confirm(`¿Estás seguro de que deseas eliminar el usuario con id ${usuario.usuId}?`)) {
          this.usuarioService.eliminarUsuario(usuario.usuId).subscribe(response => {
            if (response === 'Eliminacion Correcta') {
              alert(`El usuario con id ${usuario.usuId} ha sido eliminado.`);
              this.listaUsuarios = this.listaUsuarios.filter(u => u.usuId !== usuario.usuId);
            } else {
              alert("No se pudo eliminar el usuario.");
            }
          }, error => {
            console.error("Error al intentar eliminar el usuario:", error);
            alert("Hubo un error al intentar eliminar el usuario.");
          });
        }
      }

}
