import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IEmpresa, IResponseDTO } from '../interfaces/generico.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  baseUrl = environment.urlBase + "/empresa";

  constructor(
    private http: HttpClient
  ) { }


listarAll():Observable<Array<IEmpresa>>{
  return this.http.get<Array<IEmpresa>>(`${this.baseUrl}/listar`);
}

crearEmpresa(empresa: IEmpresa):Observable<IEmpresa>{

  if(empresa.emprId !== 0){
    return this.http.put<IEmpresa>(`${this.baseUrl}/actualizar/${empresa.emprId}`, empresa);
  }else{
    return this.http.post<IEmpresa>(`${this.baseUrl}/crear`, empresa);
  }

}

eliminarEmpresa(id: number): Observable<IResponseDTO> {
  return this.http.delete<IResponseDTO>(`${this.baseUrl}/eliminar/${id}`);
}

}
