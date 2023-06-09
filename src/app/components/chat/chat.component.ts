import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMessage, IUser } from 'src/app/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

/**
 * Componente para el envío y recibo de mensajes de chat
 */
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  /**Subscripción para el SocketService referenciado en el servicio de ChatService */
  private messagesSubcription!: Subscription;

  /**Usuario propio del chat */
  myUser: IUser;
  /**Mensaje a enviar */
  message: string = "";
  /**Arreglo de mensajes */
  messages: Array<IMessage> = [];

  $chatMessagesListElement!: HTMLUListElement;

  /**
   * 
   * @param chatService Inyección de Service ChatService
   */
  constructor(
    public chatService: ChatService,
    public webSocketService: WebSocketService,
  ) {
    this.myUser = <IUser>webSocketService.getUser();
  }

  /**Enviar mensaje */
  send(): void {
    if (!this.message.length) return;

    this.chatService.sendMessage(this.message);
    this.message = "";
  }

  ngOnInit(): void {
    /**Referenciar ulList con el elemento del componente por medio de su id */
    this.$chatMessagesListElement = document.getElementById("chat-messages-list") as HTMLUListElement;

    /**Asignar la subscripción desde el servicio ChatService en el método getMessages() */
    this.messagesSubcription = this.chatService.getMessages().subscribe( msg => {
      console.log(msg);
      /**Pushear el mensaje obtenido desde el observable */
      this.messages.push(msg as IMessage);
      /**Hacer scroll al fondo de la ul list */
      setTimeout(() => {
        this.$chatMessagesListElement.scrollTop = this.$chatMessagesListElement?.scrollHeight;
      }, 100);
    });
  }

  ngOnDestroy(): void {
    /**Desuscribirse */
    this.messagesSubcription.unsubscribe();
  }
}
