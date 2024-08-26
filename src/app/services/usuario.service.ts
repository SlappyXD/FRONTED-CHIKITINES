import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUsuario } from '../interfaces/generico.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.urlBase + "/user/login";

  constructor(
    private http: HttpClient
  ) { }

  listarAll():Observable<Array<IUsuario>>{
    return this.http.get<Array<IUsuario>>(`${this.baseUrl}/listar`);
  }

  crearUsuario(usuario : IUsuario):Observable<IUsuario>{

    if(usuario.usuId && usuario.usuId !== 0){
      return this.http.put<IUsuario>(`${this.baseUrl}/modificar/${usuario.usuId}`, usuario);
    }else{
      return this.http.post<IUsuario>(`${this.baseUrl}/crear`, usuario);
    }

  }

  eliminarUsuario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }


}
