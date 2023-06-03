import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/web-socket.service';

/**
 * Componente que representa la pantalla del Login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /**Nombre de usuario para el acceso */
  username: string = "";

  constructor(
    private readonly WebSocketService: WebSocketService,
    private readonly router: Router,
  ) {}

  /**Método para acceder a la aplicación */
  async login(): Promise<void> {
    await this.WebSocketService.loginWebSocket({
      id: null,
      username: this.username,
      room: null
    });

    this.router.navigateByUrl("/messages");
  }
}
