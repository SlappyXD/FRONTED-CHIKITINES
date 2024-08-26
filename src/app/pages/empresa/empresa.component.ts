import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IEmpresa, IResponseDTO } from 'src/app/interfaces/generico.interface';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PopEmpresaComponent } from './pop-empresa/pop-empresa.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  listaEmpresas: Array<IEmpresa> = [];
  title = 'Empresa';


  constructor(
    private empresaService: EmpresaService,
    public dialog: MatDialog
  ) { }




  addEmpresa() {
  const dialogoEmpresa = this.dialog.open(PopEmpresaComponent,{
    width: '50%',
    disableClose: true
  });

  dialogoEmpresa.beforeClosed().subscribe(result=>{
    if(result.success){
      alert("Se ha creado la empresa con id " + result.data.emprId);
      //this.listaEmpresas.push(result.data);
      this.listarAll();
    }
  })
  }

 updateEmpresa(empresa: IEmpresa) {
    const dialogoEmpresa = this.dialog.open(PopEmpresaComponent,{
      width: '50%',
      disableClose: true,
      data: empresa
    });

    dialogoEmpresa.beforeClosed().subscribe(result=>{
      if(result.success){
        alert("Se ha actualizado la empresa con id " + result.data.emprId);
        //this.listaEmpresas.push(result.data);
        this.listarAll();
      }
    })
    }

  ngOnInit(): void {
    this.listarAll();
  }

  listarAll() {
    this.empresaService.listarAll().subscribe(response => {
      console.log(response);
      this.listaEmpresas = response;
    }, error => {
      console.error(error);

    });
  }

  eliminarEmpresa(empresa: IEmpresa) {
    if (confirm(`¿Estás seguro de que deseas eliminar la empresa con id ${empresa.emprId}?`)) {
      this.empresaService.eliminarEmpresa(empresa.emprId).subscribe((response: IResponseDTO) => {
        if (response.success) {
          alert(`La empresa con id ${empresa.emprId} ha sido eliminada.`);
          this.listaEmpresas = this.listaEmpresas.filter(e => e.emprId !== empresa.emprId);
        } else {
          alert("No se pudo eliminar la empresa.");
        }
      }, error => {
        console.error("Error al intentar eliminar la empresa:", error);
        alert("Hubo un error al intentar eliminar la empresa.");
      });
    }
  }


}
