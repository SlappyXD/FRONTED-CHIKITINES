import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IEmpleado, IResponseDTO } from '../interfaces/generico.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUrl = environment.urlBase + "/empleado";

  constructor(
    private http: HttpClient
  ) { }

  listarAll():Observable<Array<IEmpleado>>{
    return this.http.get<Array<IEmpleado>>(`${this.baseUrl}/listar`);
  }

  crearEmpleado(empleado: IEmpleado):Observable<IEmpleado>{

    if(empleado.emplId && empleado.emplId !== 0){
      return this.http.put<IEmpleado>(`${this.baseUrl}/modificar/${empleado.emplId}`, empleado);
    }else{
      return this.http.post<IEmpleado>(`${this.baseUrl}/crear`, empleado);
    }

  }

  eliminarRol(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }

}
