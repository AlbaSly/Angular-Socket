import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  /**Booleano que determina si la conexión al socket está activa o no */
  socketStatus: boolean = false;

  /**
   * 
   * @param socket Atributo socket desde donde se manejará la información en tiempo real
   */
  constructor(
    private socket: Socket
  ) { 
    this.checkStatus();
  }

  /**
   * Obtener el estado de la conexión del socket entre cliente - servidor
   */
  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', () => {
      console.log('Desconectado al servidor');
      this.socketStatus = false;
    });
  }

  /**
   * Disparar un evento hacia el servidor
   * @param event nombre del evento que se desea disparar por medio del socket
   * @param payload datos a enviar al servidor por medio del socket
   * @param callback Función a llamar una vez finalizada la emisión del evento
   */
  emit(event: string, payload?: any, callback?: Function): void {
    this.socket.emit(event, payload, callback);
  }

  /**
   * Escuchar cualquier evento desde el servidor en tiempo real
   * @param event nombre del evento que se desea escuchar
   * @returns Observable con la información traída del servidor en tiempo real
   */
  listen(event: string): Observable<unknown> {
    return this.socket.fromEvent(event);
  }
}
