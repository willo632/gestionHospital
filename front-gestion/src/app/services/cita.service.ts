import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private baseUrl = `${environment.apiUrl}/citas`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

  obtener(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.baseUrl}/${id}`);
  }

  crear(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.baseUrl, cita);
  }

  actualizar(id: number, cita: Partial<Cita>): Observable<Cita> {
    return this.http.put<Cita>(`${this.baseUrl}/${id}`, cita);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
