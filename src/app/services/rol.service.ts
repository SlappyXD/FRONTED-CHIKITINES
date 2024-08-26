import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IRol } from '../interfaces/generico.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  baseUrl = environment.urlBase + "/rol";

  constructor(
    private http: HttpClient
  ) { }

  listarAll():Observable<Array<IRol>>{
    return this.http.get<Array<IRol>>(`${this.baseUrl}/listar`);
  }

  crearRol(rol: IRol):Observable<IRol>{

    if(rol.id && rol.id !== 0){
      return this.http.put<IRol>(`${this.baseUrl}/modificar/${rol.id}`, rol);
    }else{
      return this.http.post<IRol>(`${this.baseUrl}/crear`, rol);
    }

  }

  eliminarRol(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }

}
