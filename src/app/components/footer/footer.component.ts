import { Component } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

/**Componente Footer para mostar el estado de la conexión del socket */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  /**
   * 
   * @param webSocketService Inyección del Service WebSocketService
   */
  constructor(
    public webSocketService: WebSocketService,
  ) {}
}
