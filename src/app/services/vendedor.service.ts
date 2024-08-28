import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Vendedor } from '../interfaces/vendedor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  baseUrl = environment.urlBase + "/vendedor";

  constructor(private http: HttpClient) { }

  listAll(): Observable<Array<Vendedor>> {

  const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:123456')
    });
    return this.http.get<Array<Vendedor>>(`${this.baseUrl}`, { headers });
  }

  // Crear o Actualizar un producto
    createVendedor(vendedor: Vendedor): Observable<Vendedor> {
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa('admin:123456'),
          'Content-Type': 'application/json'
        });

        if (vendedor.idVendedor && vendedor.idVendedor !== 0) {
          // PUT para actualizar, se envía el producto con el ID
          return this.http.put<Vendedor>(this.baseUrl, vendedor, { headers });
        } else {
          // POST para crear, sin incluir el ID en el cuerpo
          return this.http.post<Vendedor>(this.baseUrl, vendedor, { headers });
        }
    }  
  
  // Eliminar un producto por ID
    deleteProduct(idVendedor: number): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:123456')
      });
      return this.http.delete<void>(`${this.baseUrl}/${idVendedor}`, { headers });
    }

}
