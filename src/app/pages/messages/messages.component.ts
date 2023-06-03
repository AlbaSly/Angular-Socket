import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

/**
 * Componente que representa la pantalla de los mensajes
 */
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  /**Identifica si se está cerrando la sesión en este momento */
  isExiting: boolean = false;
  /**Contador en segundos para cerrar la sesión */
  sessionDisconnectionCounter: number = 3;

  constructor(
    private readonly router: Router,
    public readonly webSocketService: WebSocketService,
  ) {}

  /**Cerrar la sesión y regresar al login */
  exit() {
    this.webSocketService.disconnect();

    this.isExiting = true;

    /**Hacer un contador en retroceso */
    const counterInterval = setInterval(() => {
      if (this.sessionDisconnectionCounter === 0) {
        clearInterval(counterInterval);

        this.webSocketService.connect();
        this.router.navigateByUrl("/");
      }

      --this.sessionDisconnectionCounter;
    }, 1000);
  }
}
