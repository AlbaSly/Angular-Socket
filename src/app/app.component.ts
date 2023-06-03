import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'socket-base';

  constructor(
    public webSocketService: WebSocketService,
    public chatService: ChatService,
  ) {}

  ngOnInit(): void {
    /**De manera global para que se esté escuchando y corriendo durante todo el ciclo de vida de la aplicación */
    this.chatService.getPrivateMessages().subscribe(msg => {
      console.log(msg);
    });
  }
}
