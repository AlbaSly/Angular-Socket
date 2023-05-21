import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';

/**
 * Servicio para el manejo de los envíos y recibos de mensajes de chat
 */
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
   * 
   * @param webSocketService Inyección de Service WebSocketService
   */
  constructor(
    public webSocketService: WebSocketService,
  ) { }

  /**
   * Enviar Mensaje
   * @param msg el mensaje a enviar
   */
  sendMessage(msg: string) {
    /**Datos a enviar desde el socket */
    const payload = {
      de: 'Raxel',
      cuerpo: msg,
    };
    
    /**Se emite hacia el servidor los datos del payload */
    this.webSocketService.emit('mensaje', payload);
  }

  /**
   * Se obtiene los mensajes emitidos por el servidor
   * @returns Observable con la información en tiempo real
   */
  getMessages() {
    return this.webSocketService.listen('mensaje-nuevo');
  }
}
