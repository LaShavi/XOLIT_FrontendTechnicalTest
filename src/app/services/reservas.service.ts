import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private readonly baseUrl: string = 'https://localhost:7085/api'; // Configura aquí la URL base del backend

  constructor(private http: HttpClient) {}

  // Clientes

  /**
   * Obtiene el listado completo de clientes.
   * @returns Observable con un array de clientes.
   */
  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Cliente`);
  }

  /**
   * Obtiene un cliente por su ID.
   * @param id ID del cliente.
   * @returns Observable con la información del cliente.
   */
  getClienteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Cliente/${id}`);
  }

  // Espacios Compartidos

  /**
   * Obtiene el listado completo de espacios compartidos.
   * @returns Observable con un array de espacios compartidos.
   */
  getEspaciosCompartidos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/EspacioCompartido`);
  }

  /**
   * Obtiene un espacio compartido por su ID.
   * @param id ID del espacio compartido.
   * @returns Observable con la información del espacio compartido.
   */
  getEspacioCompartidoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/EspacioCompartido/${id}`);
  }

  // Reservas
  /**
   * Filtra las reservas según los parámetros proporcionados.
   * @param filtro Objeto con los filtros para las reservas.
   * @returns Observable con un array de reservas filtradas.
   */
  getReservasFiltradas(filtro: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/Reserva/filter`, filtro);
  }

  deleteReserva(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Reserva/${id}`);
  }

  updateReservaDates(id: string, body: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Reserva/${id}/dates`, body);
  }

  // Método para crear una nueva reserva
  crearReserva(reserva: any): Observable<any> {
    //return this.http.post<any>(this.baseUrl, reserva);
    return this.http.post<void>(`${this.baseUrl}/Reserva/`, reserva);
  }
}
