import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseUrl = environment.urlBase + "/products";

  constructor(private http: HttpClient) { }

  listAll(): Observable<Array<Producto>> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:123456')
    });
    return this.http.get<Array<Producto>>(`${this.baseUrl}`, { headers });
  }

    // Crear o Actualizar un producto
    createProduct(product: Producto): Observable<Producto> {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:123456'),
        'Content-Type': 'application/json'
      });

      if (product.id && product.id !== 0) {
        // PUT para actualizar, se envía el producto con el ID
        return this.http.put<Producto>(this.baseUrl, product, { headers });
      } else {
        // POST para crear, sin incluir el ID en el cuerpo
        return this.http.post<Producto>(this.baseUrl, product, { headers });
      }
    }

    /* // Actualizar un producto existente
    updateProduct(product: Producto): Observable<Producto> {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:123456'),
        'Content-Type': 'application/json'
      });
      return this.http.put<Producto>(this.baseUrl, product, { headers });

    } */



    // Eliminar un producto por ID
    deleteProduct(productId: number): Observable<void> {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:123456')
      });
      return this.http.delete<void>(`${this.baseUrl}/${productId}`, { headers });
    }
}
