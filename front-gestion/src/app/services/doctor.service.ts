import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService  {
  private baseUrl = `${environment.apiUrl}/doctores`;
  constructor(private http: HttpClient) {}

  listar(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  obtener(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/${id}`);
  }

  crear(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.baseUrl, doctor);
  }

  actualizar(id: number, doctor: Partial<Doctor>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/${id}`, doctor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
